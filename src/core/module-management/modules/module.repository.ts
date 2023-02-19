import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ModuleEntity } from './module.entity';

@Injectable()
export class ModuleRepository extends EntityRepository<ModuleEntity> {
  async getAllModules() {
    return await this.em.execute(`
        select 
          sm.id 				  as "id",
          sm."name" 			as "name",
          sm.description 	as "description",
          sm.is_active 		as "isActive"
        from sas_modules sm ;
        `);
  }
}
