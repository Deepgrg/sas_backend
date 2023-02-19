import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleRepository extends EntityRepository<RoleEntity> {}
