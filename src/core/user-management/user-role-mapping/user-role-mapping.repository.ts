import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common/decorators';
import { UserRoleMappingEntity } from './user-role.mapping.entity';

@Injectable()
export class UserRoleMappingRepository extends EntityRepository<UserRoleMappingEntity> {}
