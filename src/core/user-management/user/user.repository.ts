import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common/decorators';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends EntityRepository<UserEntity> {}
