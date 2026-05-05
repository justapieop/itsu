import { Controller, Get, Inject, Post, UseGuards, Body, UseInterceptors } from "@nestjs/common";
import { AuthenticatedUser } from "../../common/decorators/AuthenticatedUser.decorator";
import { User } from "./domain/User";
import { AuthenticatedGuard } from "../../common/guards/Authenticated.guard";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { USER_REPOSITORY, type UserRepository } from "./application/in/UserRepository.port";
import { AuthgearWebhookDto } from "./infrastructure/http/AuthgearWebhook.dto";
import { ValidSignatureGuard } from "../../common/guards/ValidSignature.guard";
import { UserRole } from "./domain/UserRole";
import { CacheInterceptor, CacheTTL } from "@nestjs/cache-manager";

@Controller("/users")
export class UserController {
  public constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @UseInterceptors(CacheInterceptor)
  @CacheTTL(24 * 60 * 60 * 1000)
  @Get("/me")
  @ApiOkResponse({
    description: "Get currently logged in user",
    type: User,
  })
  @ApiForbiddenResponse({
    description: "User is suspended",
  })
  @ApiUnauthorizedResponse({
    description: "User is not logged in",
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  public async getMe(@AuthenticatedUser() user: User): Promise<User> {
    return user;
  }

  @Post("/webhook")
  @UseGuards(ValidSignatureGuard)
  @ApiExcludeEndpoint()
  public async onWebhook(@Body() webhookDto: AuthgearWebhookDto): Promise<void> {
    const standardAttributes = webhookDto.payload.user.standardAttributes;

    await this.userRepository.save(
      new User(
        webhookDto.payload.user.id,
        standardAttributes.email,
        standardAttributes.name ?? webhookDto.payload.user.id,
        standardAttributes.picture,
        UserRole.User,
        webhookDto.payload.user.isDisabled,
        new Date(),
      )
    );
  }
}