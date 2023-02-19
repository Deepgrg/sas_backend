import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { PrivilegeEntity } from './privilege.entity';

@Injectable()
export class PrivilegeRepository extends EntityRepository<PrivilegeEntity> {}
