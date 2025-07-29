import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { BotModule } from 'src/modules/bot/bot.module';
import { UserController } from './user.controller';

@Module({
  imports: [BotModule],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
