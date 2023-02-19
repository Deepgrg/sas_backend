import { EntityRepository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { AccessEntity } from './access.entity';

@Injectable()
export class AccessRepository extends EntityRepository<AccessEntity> {}
