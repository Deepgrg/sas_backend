import { Injectable } from '@nestjs/common/decorators';
import { UserRoleMappingDto } from './user-role-mapping.dto';
import { UserRoleMappingRepository } from './user-role-mapping.repository';

@Injectable()
export class UserRoleMappingService {
  constructor(
    private readonly userRoleMappingRepository: UserRoleMappingRepository,
  ) {}

  async mapUserAndRoles(dto: UserRoleMappingDto) {}
}
