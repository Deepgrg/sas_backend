import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  /**
   * app
   */
  const APP_GLOBAL_PREFIX = configService.get('APP_GLOBAL_PREFIX');
  const APP_PORT = configService.get('APP_PORT');
  app.setGlobalPrefix(APP_GLOBAL_PREFIX);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      stopAtFirstError: false,
    }),
  );

  /**
   * swagger
   */
  const documentTitle = configService.get('SWAGGER_TITLE');
  const documentDescription = configService.get('SWAGGER_DESCRIPTION');
  const documentEndpoint = configService.get('SWAGGER_ENDPOINT');
  const swaggerConfig = new DocumentBuilder()
    .setTitle(documentTitle)
    .setDescription(documentDescription)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    ignoreGlobalPrefix: false,
  });
  SwaggerModule.setup(documentEndpoint, app, document);

  await app.listen(APP_PORT, () => {
    console.info(`=================================`);
    console.info(` ========= ENV: ${process.env.NODE_ENV} =========== `);
    console.info(`🚀 App listening on the port ${APP_PORT}`);
    console.info(`=================================`);
  });
}
bootstrap();
