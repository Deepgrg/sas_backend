import { CommonBaseEntity } from '@common/baseEntity.common';
import { Entity, EntityRepositoryType, Property } from '@mikro-orm/core';
import { ModuleRepository } from './module.repository';

@Entity({ tableName: 'sas_modules', customRepository: () => ModuleRepository })
export class ModuleEntity extends CommonBaseEntity {
  @Property({ name: 'name', nullable: false, unique: true })
  name: string;

  @Property({ name: 'description' })
  description: string;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: ModuleRepository;
}
