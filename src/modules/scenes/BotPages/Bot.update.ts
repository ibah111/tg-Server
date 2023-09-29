import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';
/**
 * Как сказано в подсказке update
 * декоратор update = controller в несте
 */
@Update()
export class BaseBotUpdateController {
  @Start()
  async start(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('👍');
  }

  @Hears('hi')
  async hears(@Ctx() ctx: TelegrafContext) {
    await ctx.reply('Hey there');
  }
}
