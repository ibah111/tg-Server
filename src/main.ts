import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  getSwaggerCustomOptions,
  getSwaggerOptions,
} from './shared/utils/swagger';
import { SqliteDatabaseSeed } from './databases/sqlite.database/seed';
import { AppModule } from './app.module';
import 'colors';
import { Logger } from '@nestjs/common';
import { NODE_ENV } from './shared/consts/node-env';
import { baseUrl } from './shared/utils/axios-instance';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Telegram bot OpenAPI')
    .setDescription(
      'Апи для получения тестирования и получения различной информации+',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerCustomOptions());
  await app.get(SqliteDatabaseSeed).sync();
  await app.listen(3000, '0.0.0.0');
  logger.debug(`Server running on ${await app.getUrl()}/docs`);

  const ollamaUrl = baseUrl();

  switch (NODE_ENV) {
    case 'development':
      logger.verbose(
        `Server running in development mode, ollama url: ${ollamaUrl}`,
      );
      break;
    case 'production':
      logger.warn(
        `Server running in production mode, ollama url: ${ollamaUrl}`,
      );
      break;
  }

  process.on('SIGINT', async () => {
    logger.debug('Received SIGINT signal');
    await app.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    logger.debug('Received SIGTERM signal');
    await app.close();
    process.exit(0);
  });
}
bootstrap();
