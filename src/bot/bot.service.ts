import { Injectable } from '@nestjs/common';
import { Context } from 'telegraf';

@Injectable()
export default class BotService {
  constructor() {}

  async onStart(ctx: Context) {
    await ctx.reply('Hello, world!');
  }

  async ollama(ctx: Context) {
    await ctx.reply('Hello, world!');
  }

  async message(ctx: Context) {
    await ctx.reply('Hello, world!');
  }
}
