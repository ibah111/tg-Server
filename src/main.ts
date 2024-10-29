import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSwaggerCustomOptions, getSwaggerOptions } from './utils/swagger';
import { SqliteDatabaseSeed } from './modules/database/sqlite.database/seed';
import { AppModule } from './app.module';
import { Telegraf } from 'telegraf';
import 'colors';
export const bot = new Telegraf(process.env.BOT_TOKEN);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Telegram bot OpenAPI')
    .setDescription(
      'Апи для получения тестирования и получения различной информации+',
    )
    .setVersion('1.0.0')
    .addTag('Cat-Bot-Requests')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerCustomOptions());
  await app.get(SqliteDatabaseSeed).sync();
  await app.listen(3000, '0.0.0.0');
  console.log(`Server running on ${await app.getUrl()}/docs`);
  console.log(`Bot launched`);
}
bootstrap();
