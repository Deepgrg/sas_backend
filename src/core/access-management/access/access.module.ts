import { ScreenPrivilegeMappingModule } from '@core/module-management/screen-privilege-mappings/screen-privilege-mapping.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { RoleModule } from '../roles/role.module';
import { AccessController } from './access.controller';
import { AccessEntity } from './access.entity';
import { AccessService } from './access.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([AccessEntity]),
    ScreenPrivilegeMappingModule,
    RoleModule,
  ],
  controllers: [AccessController],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
