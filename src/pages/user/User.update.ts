/* eslint-disable prettier/prettier */
import { Start, Update, Ctx, On } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { UserService } from './User.service';
import { OnModuleInit } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
@Update()
export class GreeterUpdate implements OnModuleInit {
  constructor(
    private readonly service: UserService,
    @InjectBot()
    private readonly bot: Telegraf,
  ) {}
  async onModuleInit() {
    await this.bot.telegram.sendMessage('745387960', 'salam aleykum');
  }

  /**
   *
   * @param ctx
   * @returns регистрирует юзера
   */
  @Start()
  onStart(@Ctx() ctx: Context) {
    return this.service.start(ctx);
  }

  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    const message = ctx.message as any;
    console.log(message);
    return ctx.reply('Я понимаю только текстовые сообщения! 😅');
  }
}
