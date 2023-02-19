import { ResponseMessage } from '@decorators/responseMessage.decorator';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ESuccessMessage } from '@utils/response/response.enum';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ResponseMessage(ESuccessMessage.FETCH, 'Users')
  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ResponseMessage(ESuccessMessage.FETCH, 'Users')
  @Get(':userId')
  async getUserById(@Param('userId') userId: number) {
    return await this.userService.getUserById(userId);
  }

  @ResponseMessage(ESuccessMessage.CREATE, 'Users')
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }

  @ResponseMessage(ESuccessMessage.UPDATE, 'Users')
  @Put()
  async updateUser(@Body() dto: UpdateUserDto) {
    return await this.userService.updateUser(dto);
  }

  @ResponseMessage(ESuccessMessage.ACTIVATE, 'Users')
  @Patch('/activate/:userId')
  async activateUser(@Param('userId') userId: number) {
    return await this.userService.activateUser(userId);
  }

  @ResponseMessage(ESuccessMessage.ARCHIVE, 'Users')
  @Patch('/archive/:userId')
  async archiveUser(@Param('userId') userId: number) {
    return await this.userService.archiveUser(userId);
  }

  @ResponseMessage(ESuccessMessage.DELETE, 'Users')
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    return await this.userService.deleteUser(userId);
  }
}
