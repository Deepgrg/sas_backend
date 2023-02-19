import { CommonBaseEntity } from '@common/baseEntity.common';
import { ScreenPrivilegeMappingEntity } from '@core/module-management/screen-privilege-mappings/screen-privilege-mapping.entity';
import { Entity, ManyToOne, EntityRepositoryType } from '@mikro-orm/core';
import { RoleEntity } from '../roles/role.entity';
import { AccessRepository } from './access.repository';

//we need to pass that repository reference inside a callback so we will not run into circular dependency issues when using entity references inside that repository.
@Entity({ tableName: 'sys_accesses', customRepository: () => AccessRepository })
export class AccessEntity extends CommonBaseEntity {
  @ManyToOne({
    name: 'screen_privilege_mapping_id',
    nullable: false,
    onDelete: 'cascade',
  })
  screenPrivilegeMappingId: ScreenPrivilegeMappingEntity;

  @ManyToOne({ name: 'role_id', nullable: false, onDelete: 'cascade' })
  roleId: RoleEntity;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: AccessRepository;
}
