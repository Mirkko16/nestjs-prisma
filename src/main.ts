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
      console.log('Connected to the database');
      return;
    } catch (error) {
      console.error('Could not connect to database, trying again...', error);
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  throw new Error('Could not connect to database after several attempts');
}

async function bootstrap() {
  await connectToDatabase();

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
  process.exit(1);
});
