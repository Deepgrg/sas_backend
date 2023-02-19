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
import { CreateScreenDto, UpdateScreenDto } from './screen.dto';
import { ScreenService } from './screen.service';

@ApiBearerAuth()
@ApiTags('System Screen')
@Controller('screen')
export class ScreenController {
  constructor(private readonly screenService: ScreenService) {}

  @ResponseMessage(ESuccessMessage.FETCH, 'screens')
  @Get()
  async getAllScreens() {
    return await this.screenService.getAllScreens();
  }

  @ResponseMessage(ESuccessMessage.FETCH, 'screen')
  @Get(':screenId')
  async getScreenById(@Param('screenId') screenId: number) {
    return await this.screenService.getScreenById(screenId);
  }

  @ResponseMessage(ESuccessMessage.CREATE, 'screen')
  @Post()
  async createScreen(@Body() dto: CreateScreenDto) {
    return await this.screenService.createScreen(dto);
  }

  @ResponseMessage(ESuccessMessage.UPDATE, 'screen')
  @Put()
  async updateScreen(@Body() dto: UpdateScreenDto) {
    return await this.screenService.updateScreen(dto);
  }

  @ResponseMessage(ESuccessMessage.ACTIVATE, 'screen')
  @Patch('/activate/:screenId')
  async activateScreen(@Param('screenId') screenId: number) {
    return await this.screenService.activateScreen(screenId);
  }

  @ResponseMessage(ESuccessMessage.ARCHIVE, 'screen')
  @Patch('/archive/:screenId')
  async archiveScreen(@Param('screenId') screenId: number) {
    return await this.screenService.archiveScreen(screenId);
  }

  @ResponseMessage(ESuccessMessage.DELETE, 'screen')
  @Delete(':screenId')
  async deleteScreen(@Param('screenId') screenId: number) {
    return await this.screenService.deleteScreen(screenId);
  }
}
