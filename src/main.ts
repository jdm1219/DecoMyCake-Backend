import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ResponseInterceptor(), new ErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix(process.env.API_PREFIX);
  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('🎂deco my cake🍰')
    .setDescription('The cake API description')
    .setVersion('1.0')
    .addSecurity('Authorization', {
      name: 'Authorization',
      in: 'header',
      type: 'apiKey',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
