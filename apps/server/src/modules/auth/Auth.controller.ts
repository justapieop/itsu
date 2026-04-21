import { BadRequestException, Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthResponse } from "./application/ports/out/Auth.response";
import { LoginCredentialsDto } from "./application/ports/in/LoginCredentials.dto";
import { AuthService } from "./Auth.service";
import { JwtService } from "../jwt/Jwt.service";
import { User } from "../user/domain/User";
import { RegisterCredentialsDto } from "./application/ports/in/RegisterCredentials.dto";
import { hash } from "@node-rs/argon2";
import { ApiResponse } from "@nestjs/swagger";

@Controller("/auth")
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    type: AuthResponse,
  })
  @ApiResponse({
    status: 400,
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

    const [accessToken, refreshToken] = [
      await this.jwtService.createToken(user.id, 30 * 60),
      await this.jwtService.createToken(user.id, 7 * 24 * 60 * 60),
    ];

    return {
      accessToken,
      refreshToken,
      expiresIn: Math.floor(Date.now() / 1000) + 30 * 60,
    };
  }
  
  @ApiResponse({
    status: 201,
    description: "User logged in successfully",
    type: AuthResponse,
  })
  @ApiResponse({
    status: 401,
    description: "Invalid credentials",
  })
  @ApiResponse({
    status: 404,
    description: "User not found",
  })
  @Post("/login")
  public async onLogin(@Body() credentials: LoginCredentialsDto): Promise<AuthResponse> {
    let user: User;
    try {
      user = await this.authService.login(credentials.email, credentials.password);
    } catch (e: unknown) {
      throw new UnauthorizedException(e);
    }

    const [accessToken, refreshToken] = [
      await this.jwtService.createToken(user.id, 30 * 60),
      await this.jwtService.createToken(user.id, 7 * 24 * 60 * 60),
    ];

    return {
      accessToken,
      refreshToken,
      expiresIn: Math.floor(Date.now() / 1000) + 30 * 60,
    };
  }
}