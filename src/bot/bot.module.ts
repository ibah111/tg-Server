import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleWare } from 'src/shared/utils/session-middleware';
import BotUpdate from './bot.update';
import BotService from './bot.service';
import TelegramModule from './telegram/telegram.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('tokens.telegram'),
        middlewares: [sessionMiddleWare],
        include: [BotUpdate],
      }),
      inject: [ConfigService],
    }),
    TelegramModule,
  ],
  exports: [TelegrafModule],
  providers: [BotService],
})
export class BotModule {}
