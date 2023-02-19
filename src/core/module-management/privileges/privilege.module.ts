import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { PrivilegeController } from './privilege.controller';
import { PrivilegeEntity } from './privilege.entity';
import { PrivilegeService } from './privilege.service';

@Module({
  imports: [MikroOrmModule.forFeature([PrivilegeEntity])],
  controllers: [PrivilegeController],
  providers: [PrivilegeService],
  exports: [PrivilegeService],
})
export class PrivilegeModule {}
