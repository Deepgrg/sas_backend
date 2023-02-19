import { CommonBaseEntity } from '@common/baseEntity.common';
import { RoleEntity } from '@core/access-management/roles/role.entity';
import { Entity, ManyToOne, EntityRepositoryType } from '@mikro-orm/core';
import { UserEntity } from '../user/user.entity';
import { UserRoleMappingRepository } from './user-role-mapping.repository';

//we need to pass that repository reference inside a callback so we will not run into circular dependency issues when using entity references inside that repository.
@Entity({
  tableName: 'sas_user_role_mappings',
  customRepository: () => UserRoleMappingRepository,
})
export class UserRoleMappingEntity extends CommonBaseEntity {
  @ManyToOne({ name: 'user_id', nullable: false, onDelete: 'cascade' })
  userId: UserEntity;

  @ManyToOne({ name: 'role_id', nullable: false, onDelete: 'cascade' })
  roleId: RoleEntity;

  /**
   * Inferring custom repository type
   * em.getRepository() method return correctly typed custom repository instead of the generic EntityRepository<T>
   */
  [EntityRepositoryType]?: UserRoleMappingRepository;
}
