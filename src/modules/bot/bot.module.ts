import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScenesModule } from 'src/pages/scenes/scenes.module';
import { sessionMiddleWare } from 'src/utils/sessionMiddleware';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('bot.token'),
        middlewares: [sessionMiddleWare],
        include: [ScenesModule],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class BotModule {}
