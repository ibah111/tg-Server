import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserUpdate } from './User.update';
import { UserService } from './User.service';
import { Users } from 'src/modules/database/sqlite.database/models/User.model';
import { BotModule } from 'src/modules/bot/bot.module';

@Module({
  imports: [SequelizeModule.forFeature([Users], 'local'), BotModule],
  providers: [UserUpdate, UserService],
  exports: [UserUpdate, UserService],
})
export class UserModule {}
