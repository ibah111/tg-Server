import { Module } from '@nestjs/common';
import TelegramService from './telegram.service';

@Module({
  providers: [TelegramService],
  exports: [TelegramService],
})
export default class TelegramModule {}
