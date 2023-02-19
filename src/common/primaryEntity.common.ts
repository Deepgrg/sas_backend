import { PrimaryKey } from '@mikro-orm/core';

export abstract class CommonPrimaryEntity {
  @PrimaryKey({ name: 'id', autoincrement: true })
  id: number;
}
