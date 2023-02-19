import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ScreenPrivilegeMappingEntity } from './screen-privilege-mapping.entity';

@Injectable()
export class ScreenPrivilegeMappingRepository extends EntityRepository<ScreenPrivilegeMappingEntity> {
  async countValidPrivileges(privileges: number[]) {
    const res = await this.em.execute(
      `
      // TODO
    `,
      privileges,
    );
    return 1;
  }

  async deleteMappingsFromScreen(screenId: number) {
    await this.em.execute(
      `
            delete from sas_screen_privilege_mappings sspm where sspm.screenId = ?
        `,
      [screenId],
    );
  }
}
