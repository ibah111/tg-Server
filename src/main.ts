import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { bot } from './configs/bot';
import { getSwaggerCustomOptions, getSwaggerOptions } from './utils/swagger';

async function bootstrap() {
  /**
   * app + swagger launch
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
  await app.listen(443, '0.0.0.0');
  console.log(`Server running on ${await app.getUrl()}/docs`);
  bot.launch();
  console.log(`Bot launched`);
}
bootstrap();

/**
 * bot listeners
 */
bot.start((ctx) => {
  ctx.reply(`Привет, ${ctx.from.first_name}`);
  console.log(ctx.chat, '\n', ctx.from.is_bot);
});
