import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import BotService from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log('onStart');

    await this.botService.onStart(ctx);
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    await this.botService.onHelp(ctx);
  }

  @Command('*')
  async unknown(@Ctx() ctx: Context) {
    await ctx.reply('Unknown command');
  }

  @Command('ollama')
  async ollama(@Ctx() ctx: Context) {
    console.log('ollama command'.yellow);
    await this.botService.ollama(ctx);
  }

  @On('message')
  async message(@Ctx() ctx: Context) {
    await this.botService.message(ctx);
  }
}
