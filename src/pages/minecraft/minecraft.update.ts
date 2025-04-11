import { Command, Ctx, Update } from 'nestjs-telegraf';
import { MinecraftService } from './minecraft.service';
import { Context } from 'telegraf';

@Update()
export default class MinecraftUpdate {
  constructor(private readonly service: MinecraftService) {}

  @Command('getIp')
  async getIp(@Ctx() ctx: Context) {
    const data = await this.service.getMinecraftServerIp();
    const reply_text = `domain: ${data.domain_connect}\nlocal: ${data.local_ip}`;
    ctx.reply(reply_text);
  }
}
