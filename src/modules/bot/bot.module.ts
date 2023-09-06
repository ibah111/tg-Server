import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../database/local.database/models/user.model';
import { BotService } from './bot.service';
import { token } from '../../configs/bot';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    SequelizeModule.forFeature([User], 'local'),
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: token,
      }),
    }),
  ],
  providers: [BotService],
})
export class BotModule {}
