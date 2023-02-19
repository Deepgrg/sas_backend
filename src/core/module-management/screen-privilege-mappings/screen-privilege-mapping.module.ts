import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScreenPrivilegeMappingEntity } from './screen-privilege-mapping.entity';
import { ScreenPrivilegeMappingService } from './screen-privilege-mapping.service';

@Module({
  imports: [MikroOrmModule.forFeature([ScreenPrivilegeMappingEntity])],
  controllers: [],
  providers: [ScreenPrivilegeMappingService],
  exports: [ScreenPrivilegeMappingService],
})
export class ScreenPrivilegeMappingModule {}
