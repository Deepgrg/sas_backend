import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrivilegeDto, UpdatePrivilegeDto } from './privilege.dto';
import { PrivilegeRepository } from './privilege.repository';

@Injectable()
export class PrivilegeService {
  constructor(private readonly privilegeRepository: PrivilegeRepository) {}

  async getAllPrivileges() {
    return await this.privilegeRepository.findAll();
  }

  async getPrivilegeById(privilegeId: number) {
    const privilege = await this.privilegeRepository.findOne({
      id: privilegeId,
    });
    if (!privilege) {
      throw new NotFoundException(
        `Privilege with id: ${privilegeId} not found`,
      );
    }
    return privilege;
  }

  async createPrivilege(dto: CreatePrivilegeDto) {
    const privilege = await this.privilegeRepository.create(dto);
    await this.privilegeRepository.persistAndFlush(privilege);
  }

  async updatePrivilege(dto: UpdatePrivilegeDto) {
    const privilege = await this.getPrivilegeById(dto.id);
    this.privilegeRepository.assign(privilege, { ...dto });
    await this.privilegeRepository.persistAndFlush(privilege);
  }

  async activatePrivilege(privilegeId: number) {
    const privilege = await this.getPrivilegeById(privilegeId);
    this.privilegeRepository.assign(privilege, { isActive: true });
    await this.privilegeRepository.persistAndFlush(privilege);
  }

  async archivePrivilege(privilegeId: number) {
    const privilege = await this.getPrivilegeById(privilegeId);
    this.privilegeRepository.assign(privilege, { isActive: false });
    await this.privilegeRepository.persistAndFlush(privilege);
  }

  async deletePrivilege(privilegeId: number) {
    const privilege = await this.getPrivilegeById(privilegeId);
    await this.privilegeRepository.removeAndFlush(privilege);
  }
}
