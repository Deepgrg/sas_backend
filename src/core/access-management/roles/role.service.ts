import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from './role.dto';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles() {
    return await this.roleRepository.findAll();
  }

  async getRoleById(roleId: number) {
    const role = await this.roleRepository.findOne({ id: roleId });
    if (!role) {
      throw new NotFoundException(`Role with id: ${roleId} not found`);
    }
    return role;
  }

  async createRole(dto: CreateRoleDto) {
    const role = this.roleRepository.create(dto);
    await this.roleRepository.persistAndFlush(role);
  }

  async updateRole(dto: UpdateRoleDto) {
    const role = await this.getRoleById(dto.id);
    this.roleRepository.assign(role, { ...dto });
    await this.roleRepository.persistAndFlush(role);
  }

  async activateRole(roleId: number) {
    const role = await this.getRoleById(roleId);
    this.roleRepository.assign(role, { isActive: true });
    await this.roleRepository.persistAndFlush(role);
  }

  async archiveRole(roleId: number) {
    const role = await this.getRoleById(roleId);
    this.roleRepository.assign(role, { isActive: false });
    await this.roleRepository.persistAndFlush(role);
  }

  async deleteRole(roleId: number) {
    const role = await this.getRoleById(roleId);
    await this.roleRepository.removeAndFlush(role);
  }
}
