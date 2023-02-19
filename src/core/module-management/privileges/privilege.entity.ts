import { CommonBaseEntity } from '@common/baseEntity.common';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { PrivilegeRepository } from './privilege.repository';

@Entity({
  tableName: 'sas_privileges',
  customRepository: () => PrivilegeRepository,
})
export class PrivilegeEntity extends CommonBaseEntity {
  @Property({ name: 'name', nullable: false, unique: true })
  name: string;

  @Property({ name: 'description' })
  description: string;

  @Property({ name: 'method', nullable: false, unique: true })
  method: string;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: PrivilegeRepository;
}
