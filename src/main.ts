import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getSwaggerCustomOptions, getSwaggerOptions } from './utils/swagger';
import { LocalDatabaseSeed } from './modules/database/seed';
import { AppModule } from './app.module';
import { bot } from './configs/bot';

async function bootstrap() {
  /**
   * app + swagger launch
   * ожидает AppModule
   */
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('tg-bot-swagger')
    .setDescription('Ryazhenka-tg-bot')
    .setVersion('1.0.0')
    .addTag('Cat-Bot-Requests')
    .build();
  const document = SwaggerModule.createDocument(
    app,
    config,
    getSwaggerOptions(),
  );
  SwaggerModule.setup('docs', app, document, getSwaggerCustomOptions());
  await app.get(LocalDatabaseSeed).sync();
  await app.listen(443, '0.0.0.0');
  console.log(`Server running on ${await app.getUrl()}/docs`);
  console.log(`Bot launched`);
}
bootstrap();
