import { Start, Update, Ctx } from 'nestjs-telegraf';
import { Context } from 'src/shared/interfaces/context.interface';
import { UserService } from './User.service';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { ADMIN_ID, SBORKA_CHAT_ID } from 'src/shared/consts/telegram_ids';

@Update()
export class UserUpdate implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly service: UserService,
    @InjectBot()
    private readonly bot: Telegraf,
  ) {}

  async onModuleInit() {
    const message_text = `Бот запущен! Время запуска: ${new Date().toLocaleString()}`;
    try {
      await this.bot.telegram.sendMessage(ADMIN_ID, message_text); // отправка сообщения в чат администратора
      //await this.bot.telegram.sendMessage(SBORKA_CHAT_ID, message_text); <== отправляет в чат сборки
    } catch (error) {
      console.error('Error sending initial message:'.red, error);
    }
    this.bot.on('message', (ctx) => {
      this.service.onText(ctx);
    });
  }

  async onModuleDestroy() {
    const shutdownMessage = `Бот выключен! Время выключения: ${new Date().toLocaleString()}`;
    try {
      await this.bot.telegram.sendMessage(ADMIN_ID, shutdownMessage);
      await this.bot.telegram.sendMessage(SBORKA_CHAT_ID, shutdownMessage);
      console.log('Shutdown message sent successfully');
    } catch (error) {
      console.error('Error sending shutdown message:'.red, error);
    }
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    return this.service.start(ctx);
  }
}
