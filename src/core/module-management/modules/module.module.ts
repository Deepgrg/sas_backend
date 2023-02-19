import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleEntity } from './module.entity';
import { ModuleService } from './module.service';

@Module({
  imports: [MikroOrmModule.forFeature([ModuleEntity])],
  controllers: [ModuleController],
  providers: [ModuleService],
  exports: [ModuleService],
})
export class ModuleModule {}
