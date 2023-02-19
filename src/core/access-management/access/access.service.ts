import { ScreenPrivilegeMappingService } from '@core/module-management/screen-privilege-mappings/screen-privilege-mapping.service';
import { RuntimeException } from '@exceptions/runtime.exception';
import { Injectable, HttpStatus } from '@nestjs/common';
import { RoleService } from '../roles/role.service';
import { UpdateAccessDto, EAccessUpdateAction } from './access.dto';
import { AccessRepository } from './access.repository';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
    private readonly screenPrivilegeMappingService: ScreenPrivilegeMappingService,
    private readonly roleService: RoleService,
  ) {}

  async updateAccess(dto: UpdateAccessDto) {
    const screenPrivilegeMapping =
      await this.screenPrivilegeMappingService.findMapping({
        screenId: dto.screenId,
        privilegeId: dto.privilegeId,
      });
    const role = await this.roleService.getRoleById(dto.roleId);
    const access = await this.accessRepository.findOne({
      screenPrivilegeMappingId: screenPrivilegeMapping.id,
      roleId: role.id,
    });

    if (dto.action === EAccessUpdateAction.CREATE) {
      if (access) {
        throw new RuntimeException(
          HttpStatus.BAD_REQUEST,
          `Role with id ${role.id} already has given access`,
        );
      }
      const data = this.accessRepository.create({
        screenPrivilegeMappingId: screenPrivilegeMapping.id,
        roleId: role.id,
      });
      await this.accessRepository.persistAndFlush(data);
    }
    if (dto.action === EAccessUpdateAction.DELETE) {
      if (!access) {
        throw new RuntimeException(
          HttpStatus.BAD_REQUEST,
          `Role with id ${role.id} does not have given access`,
        );
      }
      await this.accessRepository.removeAndFlush(access);
    }
    throw new RuntimeException(HttpStatus.BAD_REQUEST, 'Invalid action');
  }
}
