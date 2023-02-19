import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ScreenEntity } from './screen.entity';

@Injectable()
export class ScreenRepository extends EntityRepository<ScreenEntity> {}
