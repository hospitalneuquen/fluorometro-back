import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = app.get(ConfigService);
  if (config.get('ENVIRONMENT') == 'DEV') {
    const docBuilder = new DocumentBuilder()
      .setTitle('Fluorometro API')
      .setDescription('API del backend del fluorometro')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, docBuilder);
    SwaggerModule.setup('swagger', app, document);
  }
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
