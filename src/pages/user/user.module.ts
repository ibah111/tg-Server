import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserUpdate } from './User.update';
import { UserService } from './User.service';
import { Users } from 'src/databases/sqlite.database/models/User.model';
import { BotModule } from 'src/modules/bot/bot.module';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([Users], 'local'), BotModule],
  providers: [UserUpdate, UserService],
  exports: [UserUpdate, UserService],
  controllers: [UserController],
})
export class UserModule {}
