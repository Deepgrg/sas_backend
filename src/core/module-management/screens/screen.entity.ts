import { CommonBaseEntity } from '@common/baseEntity.common';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { ModuleEntity } from '../modules/module.entity';
import { ScreenRepository } from './screen.repository';

@Entity({ tableName: 'sas_screens', customRepository: () => ScreenRepository })
export class ScreenEntity extends CommonBaseEntity {
  @Property({ name: 'name', nullable: false, unique: true })
  name: string;

  @Property({ name: 'description' })
  description: string;

  @ManyToOne({ name: 'module_id', nullable: false, onDelete: 'no action' })
  moduleId: ModuleEntity;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: ScreenRepository;
}
