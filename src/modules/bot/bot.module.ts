import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/local.database/models/User.model';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { ScenesModule } from 'src/pages/scenes/scenes.module';

const sessionMiddleWare = session();

@Module({
  imports: [
    SequelizeModule.forFeature([Users], 'local'),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('bot.token'),
        /**
         * Чтобы бот работал, надо добавить мидлвэйр
         * и модуль сцен
         */
        middlewares: [sessionMiddleWare],
        include: [ScenesModule],
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
