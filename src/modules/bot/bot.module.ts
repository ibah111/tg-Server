import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleWare } from 'src/utils/sessionMiddleware';
import { UserUpdate } from 'src/pages/user/User.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('bot.token'),
        middlewares: [sessionMiddleWare],
        include: [UserUpdate],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TelegrafModule],
})
export class BotModule {}
