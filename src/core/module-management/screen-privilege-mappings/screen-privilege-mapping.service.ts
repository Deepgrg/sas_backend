import { RuntimeException } from '@exceptions/runtime.exception';
import { HttpStatus, NotFoundException } from '@nestjs/common';
import { PrivilegeService } from '../privileges/privilege.service';
import { ScreenService } from '../screens/screen.service';
import {
  EndpointDto,
  IFindScreenPrivilegeMapping,
} from './screen-privilege-mapping.interface';
import { ScreenPrivilegeMappingRepository } from './screen-privilege-mappings.repository';

export class ScreenPrivilegeMappingService {
  constructor(
    private readonly screenPrivilegeMappingRepository: ScreenPrivilegeMappingRepository,
    private readonly screenService: ScreenService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  async findMapping(iFindMapping: IFindScreenPrivilegeMapping) {
    const screen = await this.screenService.getScreenById(
      iFindMapping.screenId,
    );
    const privilege = await this.privilegeService.getPrivilegeById(
      iFindMapping.privilegeId,
    );
    const mapping = await this.screenPrivilegeMappingRepository.findOne({
      screenId: screen.id,
      privilegeId: privilege.id,
    });
    if (!mapping) {
      throw new NotFoundException(
        `Screen with id ${screen.id} does not have privilege with id ${privilege.id}`,
      );
    }
    return mapping;
  }

  async validatePrivileges(privileges: number[]) {
    const privilegeIdCount = privileges.length;
    const validPrivilegeCount =
      await this.screenPrivilegeMappingRepository.countValidPrivileges(
        privileges,
      );
    if (privilegeIdCount === validPrivilegeCount) {
      return;
    } else {
      throw new RuntimeException(
        HttpStatus.BAD_REQUEST,
        `Privilege ids must be valid, privileges donot exists`,
      );
    }
  }

  async deleteMappingsFromScreen(screenId: number) {
    await this.screenPrivilegeMappingRepository.deleteMappingsFromScreen(
      screenId,
    );
  }

  async createMappingsForScreen(screenId: number, endpoints: EndpointDto[]) {
    for (let i = 0; i < endpoints.length; i++) {
      this.screenPrivilegeMappingRepository.create({
        screenId: screenId,
        privilegeId: endpoints[i].privilegeId,
        url: endpoints[i].url,
      });
    }
    await this.screenPrivilegeMappingRepository.flush();
  }
}
