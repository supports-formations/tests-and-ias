import * as fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { UPLOADS_DIR, DATA_DIR } from './storage/markdown-repository';

async function bootstrap() {
  // Ensure required directories exist before the app starts handling
  // requests (fresh checkouts only ship empty folders under backend/).
  for (const dir of [
    UPLOADS_DIR,
    `${DATA_DIR}/users`,
    `${DATA_DIR}/journeys`,
    `${DATA_DIR}/mails`,
  ]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(UPLOADS_DIR, { prefix: '/uploads' });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}/api`);
}

bootstrap();
