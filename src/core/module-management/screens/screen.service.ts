import { CustomTranscational } from '@decorators/transaction.decorator';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ScreenPrivilegeMappingService } from '../screen-privilege-mappings/screen-privilege-mapping.service';
import { CreateScreenDto, UpdateScreenDto } from './screen.dto';
import { ScreenRepository } from './screen.repository';

@Injectable()
export class ScreenService {
  constructor(
    private readonly screenRepository: ScreenRepository,
    private readonly screenPrivilegeMappingService: ScreenPrivilegeMappingService,
  ) {}

  async getAllScreens() {
    return await this.screenRepository.findAll();
  }

  async getScreenById(screenId: number) {
    const screen = await this.screenRepository.findOne({ id: screenId });
    if (!screen) {
      throw new NotFoundException(`Screen with id: ${screenId} not found`);
    }
    return screen;
  }

  @CustomTranscational()
  async createScreen(dto: CreateScreenDto) {
    const screen = this.screenRepository.create(dto);
    const privilegeIds = dto.endPoints.map((item) => item.privilegeId);
    await this.screenRepository.persistAndFlush(screen);
    await this.screenPrivilegeMappingService.validatePrivileges(privilegeIds);
    await this.screenPrivilegeMappingService.createMappingsForScreen(
      screen.id,
      dto.endPoints,
    );
  }

  @CustomTranscational()
  async updateScreen(dto: UpdateScreenDto) {
    const screen = await this.getScreenById(dto.id);
    this.screenRepository.assign(screen, { ...dto });
    await this.screenRepository.persistAndFlush(screen);
    const privilegeIds = dto.endPoints.map((item) => item.privilegeId);
    await this.screenPrivilegeMappingService.validatePrivileges(privilegeIds);
    await this.screenPrivilegeMappingService.deleteMappingsFromScreen(
      screen.id,
    );
    await this.screenPrivilegeMappingService.createMappingsForScreen(
      screen.id,
      dto.endPoints,
    );
  }

  async activateScreen(screenId: number) {
    const screen = await this.getScreenById(screenId);
    this.screenRepository.assign(screen, { isActive: true });
    await this.screenRepository.persistAndFlush(screen);
  }

  async archiveScreen(screenId: number) {
    const screen = await this.getScreenById(screenId);
    this.screenRepository.assign(screen, { isActive: false });
    await this.screenRepository.persistAndFlush(screen);
  }

  async deleteScreen(screenId: number) {
    const screen = await this.getScreenById(screenId);
    await this.screenRepository.removeAndFlush(screen);
  }
}
