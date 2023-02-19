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
import { CreateModuleDto, UpdateModuleDto } from './module.dto';
import { ModuleService } from './module.service';

@ApiBearerAuth()
@ApiTags('System Module')
@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @ResponseMessage(ESuccessMessage.FETCH, 'modules')
  @Get()
  async getAllModules() {
    return await this.moduleService.getAllModules();
  }

  @ResponseMessage(ESuccessMessage.FETCH, 'modules')
  @Get(':moduleId')
  async getModuleById(@Param('moduleId') moduleId: number) {
    return await this.moduleService.getModuleById(moduleId);
  }

  @ResponseMessage(ESuccessMessage.CREATE, 'modules')
  @Post()
  async createModule(@Body() dto: CreateModuleDto) {
    return await this.moduleService.createModule(dto);
  }

  @ResponseMessage(ESuccessMessage.UPDATE, 'modules')
  @Put()
  async updateModule(@Body() dto: UpdateModuleDto) {
    return await this.moduleService.updateModule(dto);
  }

  @ResponseMessage(ESuccessMessage.ACTIVATE, 'modules')
  @Patch('/activate/:moduleId')
  async activateModule(@Param('moduleId') moduleId: number) {
    return await this.moduleService.activateModule(moduleId);
  }

  @ResponseMessage(ESuccessMessage.ARCHIVE, 'modules')
  @Patch('/archive/:moduleId')
  async archiveModule(@Param('moduleId') moduleId: number) {
    return await this.moduleService.archiveModule(moduleId);
  }

  @ResponseMessage(ESuccessMessage.DELETE, 'modules')
  @Delete(':moduleId')
  async deleteModule(@Param('moduleId') moduleId: number) {
    return await this.moduleService.deleteModule(moduleId);
  }
}
