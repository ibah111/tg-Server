import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { GreeterUpdate } from './user.update';
import { UserService } from './User.service';
import { Users } from 'src/modules/database/sqlite.database/models/User.model';
import { BotModule } from 'src/modules/bot/bot.module';

@Module({
  imports: [SequelizeModule.forFeature([Users], 'local'), BotModule],
  providers: [GreeterUpdate, UserService],
})
export class UserModule {}
