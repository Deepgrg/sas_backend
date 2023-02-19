import { databaseConfiguration } from '@configs/database.config';
import { environmentConfiguration } from '@configs/environment.config';
import { AccessModule } from '@core/access-management/access/access.module';
import { RoleModule } from '@core/access-management/roles/role.module';
import { ModuleModule } from '@core/module-management/modules/module.module';
import { PrivilegeModule } from '@core/module-management/privileges/privilege.module';
import { ScreenPrivilegeMappingModule } from '@core/module-management/screen-privilege-mappings/screen-privilege-mapping.module';
import { ScreenModule } from '@core/module-management/screens/screen.module';
import { UserRoleMappingModule } from '@core/user-management/user-role-mapping/user-role-mapping.module';
import { UserModule } from '@core/user-management/user/user.module';
import { AllExceptionsFilter } from '@filters/allExceptions.filter';
import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import { AllResponseInterceptor } from '@interceptors/allResponse.interceptor';
import { MikroOrmModule } from '@mikro-orm/nestjs/mikro-orm.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR, APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist';

@Module({
  imports: [
    // configuration modules
    ConfigModule.forRoot(environmentConfiguration()),
    MikroOrmModule.forRoot(databaseConfiguration()),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRESIN'),
          },
          verifyOptions: {
            ignoreExpiration: false,
          },
        };
      },
    }),

    // application modules
    ModuleModule,
    ScreenModule,
    PrivilegeModule,
    ScreenPrivilegeMappingModule,
    RoleModule,
    AccessModule,
    UserModule,
    UserRoleMappingModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: AllResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
