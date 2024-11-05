import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function connectToDatabase() {
  let attempts = 0;
  while (attempts < 5) {
    try {
      await prisma.$connect();
      console.log('Conectado a la base de datos');
      return;
    } catch (error) {
      console.error('No se pudo conectar a la base de datos, intentando de nuevo...', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000)); // Espera 5 segundos antes de volver a intentar
    }
  }
  throw new Error('No se pudo conectar a la base de datos después de varios intentos');
}

async function bootstrap() {
  await connectToDatabase(); // Llama a la función aquí antes de continuar

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Swagger 
  const config = new DocumentBuilder()
    .setTitle('Backend Assignment')
    .setDescription('Assignment Backend developer uses Nestjs, Prisma & PostgreSql')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap().catch(err => {
  console.error(err);
  process.exit(1); // Termina el proceso si hay un error
});
