import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SendMessageProps } from './interface/telegram.interface';
import { ADMIN_ID } from 'src/shared/consts/telegram_ids';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export default class TelegramService implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async onModuleInit() {
    const message = 'Bot started!';
    await this.sendMessage({
      chatId: Number(ADMIN_ID),
      message,
    });
  }

  async sendMessage({ chatId, message }: SendMessageProps) {
    await this.bot.telegram.sendMessage(chatId, message);
  }
}
