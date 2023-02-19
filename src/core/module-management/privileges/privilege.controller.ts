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
import { CreatePrivilegeDto, UpdatePrivilegeDto } from './privilege.dto';
import { PrivilegeService } from './privilege.service';

@ApiBearerAuth()
@ApiTags('System Privlege')
@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @ResponseMessage(ESuccessMessage.FETCH, 'Privileges')
  @Get()
  async getAllPrivileges() {
    return await this.privilegeService.getAllPrivileges();
  }

  @ResponseMessage(ESuccessMessage.FETCH, 'Privileges')
  @Get(':privilegeId')
  async getPrivilegeById(@Param('privilegeId') privilegeId: number) {
    return await this.privilegeService.getPrivilegeById(privilegeId);
  }

  @ResponseMessage(ESuccessMessage.CREATE, 'Privileges')
  @Post()
  async createPrivilege(@Body() dto: CreatePrivilegeDto) {
    return await this.privilegeService.createPrivilege(dto);
  }

  @ResponseMessage(ESuccessMessage.UPDATE, 'Privileges')
  @Put()
  async updatePrivilege(@Body() dto: UpdatePrivilegeDto) {
    return await this.privilegeService.updatePrivilege(dto);
  }

  @ResponseMessage(ESuccessMessage.ACTIVATE, 'Privileges')
  @Patch('/activate/:privilegeId')
  async activatePrivilege(@Param('privilegeId') privilegeId: number) {
    return await this.privilegeService.activatePrivilege(privilegeId);
  }

  @ResponseMessage(ESuccessMessage.ARCHIVE, 'Privileges')
  @Patch('/archive/:privilegeId')
  async archivePrivilege(@Param('privilegeId') privilegeId: number) {
    return await this.privilegeService.archivePrivilege(privilegeId);
  }

  @ResponseMessage(ESuccessMessage.DELETE, 'Privileges')
  @Delete(':privilegeId')
  async deletePrivilege(@Param('privilegeId') privilegeId: number) {
    return await this.privilegeService.deletePrivilege(privilegeId);
  }
}
