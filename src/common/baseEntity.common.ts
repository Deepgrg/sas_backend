import { Property } from '@mikro-orm/core';
import { CommonPrimaryEntity } from './primaryEntity.common';

export abstract class CommonBaseEntity extends CommonPrimaryEntity {
  @Property({ name: 'created_at', lazy: true })
  createdAt: Date = new Date();

  @Property({
    name: 'updated_at',
    onUpdate: () => new Date(),
    lazy: true,
    nullable: true,
  })
  updatedAt: Date;

  @Property({ name: 'created_by', nullable: true, lazy: true })
  createdBy: number;

  @Property({ name: 'updated_by', nullable: true, lazy: true })
  updatedBy: number;

  @Property({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
