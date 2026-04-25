import { Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { AuthenticatedUser } from "../../common/decorators/AuthenticatedUser.decorator";
import { User } from "./domain/User";
import { AuthenticatedGuard } from "../../common/guards/Authenticated.guard";
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { USER_REPOSITORY, type UserRepository } from "./application/in/UserRepository.port";

@Controller("/users")
export class UserController {
  public constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

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
  public async onWebhook(): Promise<void> {

  }
}