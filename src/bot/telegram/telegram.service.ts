import { Injectable, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { SendMessageProps } from './interface/telegram.interface';
import { ADMIN_ID } from 'src/shared/consts/telegram_ids';

@Injectable()
export default class TelegramService implements OnModuleInit {
  constructor(private readonly telegraf: Telegraf) {}

  async onModuleInit() {
    const message = 'Bot started!';
    await this.sendMessage({
      chatId: Number(ADMIN_ID),
      message,
    });
  }

  async sendMessage({ chatId, message }: SendMessageProps) {
    await this.telegraf.telegram.sendMessage(chatId, message);
  }
}
