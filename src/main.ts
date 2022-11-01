import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import 'dotenv';
import { AppModule } from './app.module';

async function app() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.use(bodyParser.json({ limit: '50mb' }));

  await app.listen(process.env.PORT);
}

app();
