import { EUserTypes } from '@core/user-management/user/user.enum';
import { UserService } from '@core/user-management/user/user.service';
import { RuntimeException } from '@exceptions/runtime.exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterUserDto } from './authentication.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(dto: RegisterUserDto) {
    await this.userService.createUser({
      ...dto,
      userType: EUserTypes.PUBLIC,
    });
  }

  async login(dto: LoginDto) {
    const user = await this.userService.getUserByEmail(dto.email);
    if (!user) {
      throw new RuntimeException(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
      );
    }

    const isValidCredential = await this.userService.verifyPassword(
      dto.password,
      user.password,
    );
    if (!isValidCredential) {
      throw new RuntimeException(
        HttpStatus.UNAUTHORIZED,
        'Invalid credentials',
      );
    }

    const payload = {
      sub: user.id,
      userType: user.userType,
    };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRESIN'),
    });

    return { accessToken: accessToken };
  }
}
