import { CommonBaseEntity } from '@common/baseEntity.common';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { PrivilegeEntity } from '../privileges/privilege.entity';
import { ScreenEntity } from '../screens/screen.entity';
import { ScreenPrivilegeMappingRepository } from './screen-privilege-mappings.repository';

@Entity({
  tableName: 'sas_screen_privilege_mappings',
  customRepository: () => ScreenPrivilegeMappingRepository,
})
export class ScreenPrivilegeMappingEntity extends CommonBaseEntity {
  @ManyToOne({ name: 'screen_id', nullable: false, onDelete: 'cascade' })
  screenId: ScreenEntity;

  @ManyToOne({ name: 'privilege_id', nullable: false, onDelete: 'cascade' })
  privilegeId: PrivilegeEntity;

  @Property({ name: 'url', nullable: false })
  url: string;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: ScreenPrivilegeMappingRepository;
}
