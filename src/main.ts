import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter'; // ✅ Import the exception filter

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000', // Allow frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  // ✅ Enable validation globally
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // ✅ Use the global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // 🔥 Swagger Configuration 🔥
  const config = new DocumentBuilder()
    .setTitle('Humble Superhero API')
    .setDescription('API for adding and retrieving humble superheroes.')
    .setVersion('1.0')
    .addTag('Superheroes', 'Operations related to superheroes')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Accessible at `/api`

  await app.listen(4000);
}
bootstrap();
