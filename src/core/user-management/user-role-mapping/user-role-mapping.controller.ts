import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRoleMappingDto } from './user-role-mapping.dto';
import { UserRoleMappingService } from './user-role-mapping.service';

@ApiTags('User Role Mapping')
@Controller('user-role')
export class UserRoleMappingController {
  constructor(
    private readonly userRoleMappingService: UserRoleMappingService,
  ) {}

  @Post()
  async mapUserAndRoles(@Body() dto: UserRoleMappingDto) {
    return await this.userRoleMappingService.mapUserAndRoles(dto);
  }
}
