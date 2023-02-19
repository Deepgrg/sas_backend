import { ResponseMessage } from '@decorators/responseMessage.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ESuccessMessage } from '@utils/response/response.enum';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RoleService } from './role.service';

@ApiBearerAuth()
@ApiTags('System Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ResponseMessage(ESuccessMessage.FETCH, 'Roles')
  @Get()
  async getAllRoles() {
    return await this.roleService.getAllRoles();
  }

  @ResponseMessage(ESuccessMessage.FETCH, 'Roles')
  @Get(':roleId')
  async getRoleById(@Param('roleId') roleId: number) {
    return await this.roleService.getRoleById(roleId);
  }

  @ResponseMessage(ESuccessMessage.CREATE, 'Roles')
  @Post()
  async createRole(@Body() dto: CreateRoleDto) {
    return await this.roleService.createRole(dto);
  }

  @ResponseMessage(ESuccessMessage.UPDATE, 'Roles')
  @Put()
  async updateRole(@Body() dto: UpdateRoleDto) {
    return await this.roleService.updateRole(dto);
  }

  @ResponseMessage(ESuccessMessage.ACTIVATE, 'Roles')
  @Patch('/activate/:roleId')
  async activateRole(@Param('roleId') roleId: number) {
    return await this.roleService.activateRole(roleId);
  }

  @ResponseMessage(ESuccessMessage.ARCHIVE, 'Roles')
  @Patch('/archive/:roleId')
  async archiveRole(@Param('roleId') roleId: number) {
    return await this.roleService.archiveRole(roleId);
  }

  @ResponseMessage(ESuccessMessage.DELETE, 'Roles')
  @Delete(':roleId')
  async deleteRole(@Param('roleId') roleId: number) {
    return await this.roleService.deleteRole(roleId);
  }
}
