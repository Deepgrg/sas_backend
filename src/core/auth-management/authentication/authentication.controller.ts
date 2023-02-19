import { PublicRoute } from '@decorators/public-route.decorator';
import { ResponseMessage } from '@decorators/responseMessage.decorator';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ESuccessMessage } from '@utils/response/response.enum';
import { LoginDto, RegisterUserDto } from './authentication.dto';
import { AuthenticationService } from './authentication.service';

@ApiTags('Auth')
@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ResponseMessage(ESuccessMessage.FETCH, 'user')
  @Get('/init')
  async init() {}

  @ResponseMessage(ESuccessMessage.LOGIN, 'User')
  @PublicRoute()
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this.authenticationService.login(dto);
  }

  @ResponseMessage(ESuccessMessage.REGISTER, 'User')
  @PublicRoute()
  @Post('/register')
  async register(@Body() dto: RegisterUserDto) {
    return await this.authenticationService.register(dto);
  }
}
