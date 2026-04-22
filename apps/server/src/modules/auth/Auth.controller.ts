import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Post, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthResponse } from "./application/ports/out/Auth.response";
import { LoginCredentialsDto } from "./application/ports/in/LoginCredentials.dto";
import { AuthService } from "./Auth.service";
import { User } from "../user/domain/User";
import { RegisterCredentialsDto } from "./application/ports/in/RegisterCredentials.dto";
import { hash } from "@node-rs/argon2";
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { UserNotFoundError } from "../user/domain/UserNotFound.error";
import { RefreshTokenDto } from "./application/ports/in/RefreshToken.dto";
import { AuthenticatedGuard } from "../../common/guards/Authenticated.guard";
import { AuthenticatedUser } from "../../common/decorators/AuthenticatedUser.decorator";

@Controller("/auth")
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOkResponse({
    description: "User registered successfully",
    type: AuthResponse,
  })
  @ApiBadRequestResponse({
    description: "User already exists",
  })
  @Post("/register")
  public async onRegister(@Body() credentials: RegisterCredentialsDto): Promise<AuthResponse> {
    let user: User;

    try {
      let hashedPassword: string = await hash(credentials.password, {
        algorithm: 2,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 1
      });
      user = await this.authService.register(credentials.email, hashedPassword, credentials.name);
    } catch (e: unknown) {
      throw new BadRequestException(e);
    }

    let tokens = await this.authService.issueTokens(user.id);

    const authResponse: AuthResponse = new AuthResponse();
    Object.assign(authResponse, {
      accessToken: tokens[0],
      refreshToken: tokens[1],
      expiresIn: tokens[2],
    });

    return authResponse;
  }

  @Get("/")
  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({
    description: "User logged out",
  })
  public async onTest(): Promise<string> {
    return "Nigger";
  }

  @Post("/logout")
  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({
    description: "User logged out",
  })
  public async onLogout(@AuthenticatedUser() user: User): Promise<string> {
    await this.authService.logout(user.id);
    return "Logged out";
  }

  @ApiOkResponse({
    description: "New tokens dispatched",
  })
  @ApiUnauthorizedResponse({
    description: "Invalid refresh token",
  })
  @Post("/refresh")
  public async onRefresh(@Body() credentials: RefreshTokenDto): Promise<AuthResponse> {
    let sub: string;

    try {
      sub = await this.authService.verifyRefreshToken(credentials.refreshToken);
    } catch (e: unknown) {
      throw new UnauthorizedException(e);
    }

    let tokens = await this.authService.issueTokens(sub);

    const authResponse: AuthResponse = new AuthResponse();
    Object.assign(authResponse, {
      accessToken: tokens[0],
      refreshToken: tokens[1],
      expiresIn: tokens[2],
    });

    return authResponse;
  }
  
  @ApiOkResponse({
    description: "User logged in successfully",
    type: AuthResponse,
  })
  @ApiUnauthorizedResponse({
    description: "Invalid credentials",
  })
  @ApiNotFoundResponse({
    description: "User not found",
  })
  @Post("/login")
  public async onLogin(@Body() credentials: LoginCredentialsDto): Promise<AuthResponse> {
    let user: User;
    try {
      user = await this.authService.login(credentials.email, credentials.password);
    } catch (e: unknown) {
      if (e instanceof UserNotFoundError) {
        throw new NotFoundException(e);
      }

      throw new UnauthorizedException(e);
    }

    const tokens = await this.authService.issueTokens(user.id);

    const authResponse: AuthResponse = new AuthResponse();
    Object.assign(authResponse, {
      accessToken: tokens[0],
      refreshToken: tokens[1],
      expiresIn: tokens[2],
    });

    return authResponse;
  }
}