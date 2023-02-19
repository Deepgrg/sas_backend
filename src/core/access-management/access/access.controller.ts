import { ResponseMessage } from '@decorators/responseMessage.decorator';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ESuccessMessage } from '@utils/response/response.enum';
import { UpdateAccessDto } from './access.dto';
import { AccessService } from './access.service';

@ApiBearerAuth()
@ApiTags('System Access')
@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}

  @ResponseMessage(ESuccessMessage.UPDATE, 'Access')
  @Post()
  async updateAccess(@Body() dto: UpdateAccessDto) {
    return await this.accessService.updateAccess(dto);
  }
}
