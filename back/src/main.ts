import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Para que tu frontend en Angular pueda conectarse sin errores de CORS

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Ignora datos extra que no correspondan
      forbidNonWhitelisted: true, // Lanza error si mandan basura en el JSON
    }),
  );

  await app.listen(3000);
}
bootstrap();