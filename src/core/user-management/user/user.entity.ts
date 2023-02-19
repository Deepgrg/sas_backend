import { Entity, EntityRepositoryType, Enum, Property } from '@mikro-orm/core';

import { CommonBaseEntity } from '@common/baseEntity.common';
import { UserRepository } from './user.repository';
import { EUserTypes } from './user.enum';

//we need to pass that repository reference inside a callback so we will not run into circular dependency issues when using entity references inside that repository.
@Entity({ tableName: 'sas_users', customRepository: () => UserRepository })
export class UserEntity extends CommonBaseEntity {
  @Property({ name: 'first_name', nullable: false })
  firstName: string;

  @Property({ name: 'middle_name', nullable: true })
  middleName: string;

  @Property({ name: 'last_name', nullable: false })
  lastName: string;

  @Property({ name: 'email', nullable: false, unique: true })
  email: string;

  @Property({ name: 'password', nullable: false, lazy: true })
  password: string;

  @Property({ name: 'mobile_number', nullable: false, unique: true })
  mobileNumber: string;

  @Enum(() => EUserTypes)
  userType: EUserTypes;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: UserRepository;
}
