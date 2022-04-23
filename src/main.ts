import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { RoleGuard } from './utils/authorization/role.guard';
import { WrapInterceptor } from './utils/response-wrapper/wrap.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors({ origin: 'http://localhost:3001' });
  app.setGlobalPrefix('api');
  app.enableVersioning({
    //defaultVersion: process.env.API_VERSION
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      //disableErrorMessages: true,
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(new Reflector(), {
      //strategy: 'excludeAll'
    }),
  );

  app.useGlobalGuards(new RoleGuard(new Reflector()));
  app.useGlobalInterceptors(new WrapInterceptor());

  const config = new DocumentBuilder()
    .setTitle('REST API for the localization hub project')
    .setDescription(
      'The project intends to provide a way to synchronize localization files, and streamline translation processes',
    )
    .setVersion('0.1.0')
    //.setBasePath('api')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'BearerAuth',
    )
    .addSecurityRequirements('BearerAuth')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      return (
        controllerKey.replace('Controller', '') +
        methodKey.charAt(0).toUpperCase() +
        methodKey.slice(1)
      );
    },
  });
  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(3000);
}
bootstrap();
