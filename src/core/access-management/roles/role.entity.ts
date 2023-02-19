import { CommonBaseEntity } from '@common/baseEntity.common';
import { Entity, Property, EntityRepositoryType } from '@mikro-orm/core';
import { RoleRepository } from './role.repository';

//we need to pass that repository reference inside a callback so we will not run into circular dependency issues when using entity references inside that repository.
@Entity({ tableName: 'sas_roles', customRepository: () => RoleRepository })
export class RoleEntity extends CommonBaseEntity {
  @Property({ name: 'name', nullable: false, unique: true })
  name: string;

  @Property({ name: 'description' })
  description: string;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: RoleRepository;
}
