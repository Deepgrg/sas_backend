import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ScreenPrivilegeMappingModule } from '../screen-privilege-mappings/screen-privilege-mapping.module';
import { ScreenController } from './screen.controller';
import { ScreenEntity } from './screen.entity';
import { ScreenService } from './screen.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([ScreenEntity]),
    ScreenPrivilegeMappingModule,
  ],
  controllers: [ScreenController],
  providers: [ScreenService],
  exports: [ScreenService],
})
export class ScreenModule {}
