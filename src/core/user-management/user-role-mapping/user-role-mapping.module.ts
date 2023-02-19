import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { UserRoleMappingController } from './user-role-mapping.controller';
import { UserRoleMappingService } from './user-role-mapping.service';
import { UserRoleMappingEntity } from './user-role.mapping.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserRoleMappingEntity])],
  controllers: [UserRoleMappingController],
  providers: [UserRoleMappingService],
  exports: [UserRoleMappingService],
})
export class UserRoleMappingModule {}
