import { Command, Ctx, Update } from 'nestjs-telegraf';
import { MinecraftService } from './minecraft.service';
import { Context } from 'telegraf';

@Update()
export default class MinecraftUpdate {
  constructor(private readonly service: MinecraftService) {}

  @Command('getIp')
  async getIp(@Ctx() ctx: Context): Promise<void> {
    const first_message = await ctx.reply('Pinging minecraft server...');
    const data = await this.service.getMinecraftServerIp();
    await ctx.deleteMessage(Number(first_message.message_id));
    const reply = '```\n' + JSON.stringify(data, null, 2) + '\n```';
    await ctx.reply(reply, {
      parse_mode: 'MarkdownV2',
    });
  }
}
