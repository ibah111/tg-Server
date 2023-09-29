import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from '../database/local.database/models/User.model';
import { BotService } from './bot.service';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([Users], 'local'),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('bot.token'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
