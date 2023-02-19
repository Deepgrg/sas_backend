import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModuleDto, UpdateModuleDto } from './module.dto';
import { ModuleRepository } from './module.repository';

@Injectable()
export class ModuleService {
  constructor(private readonly moduleRepository: ModuleRepository) {}

  async getAllModules() {
    return await this.moduleRepository.getAllModules();
  }

  async getModuleById(moduleId: number) {
    const module = await this.moduleRepository.findOne({ id: moduleId });
    if (!module) {
      throw new NotFoundException(`Module with id: ${moduleId} not found`);
    }
    return module;
  }

  async createModule(dto: CreateModuleDto) {
    const module = this.moduleRepository.create(dto);
    await this.moduleRepository.persistAndFlush(module);
  }

  async updateModule(dto: UpdateModuleDto) {
    const module = await this.getModuleById(dto.id);
    this.moduleRepository.assign(module, { ...dto });
    await this.moduleRepository.persistAndFlush(module);
  }

  async activateModule(moduleId: number) {
    const module = await this.getModuleById(moduleId);
    this.moduleRepository.assign(module, { isActive: true });
    await this.moduleRepository.persistAndFlush(module);
  }

  async archiveModule(moduleId: number) {
    const module = await this.getModuleById(moduleId);
    this.moduleRepository.assign(module, { isActive: false });
    await this.moduleRepository.persistAndFlush(module);
  }

  async deleteModule(moduleId: number) {
    const module = await this.getModuleById(moduleId);
    await this.moduleRepository.removeAndFlush(module);
  }
}
