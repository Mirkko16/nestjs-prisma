import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuracion para usar Swagger (documentacion)
  const config = new DocumentBuilder()
  .setTitle('Backend Assignment')
  .setDescription('Assignment Backend developer uses Nestjs, Prisma & PostgreSql')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
