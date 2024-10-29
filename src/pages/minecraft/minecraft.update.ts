import { Command, Ctx, Update } from 'nestjs-telegraf';
import { MinecraftService } from './minecraft.service';
import { Context } from 'telegraf';

@Update()
export default class MinecraftUpdate {
  constructor(private readonly service: MinecraftService) {}

  @Command('getIp')
  async getIp(@Ctx() ctx: Context) {
    const data = await this.service.getMinecraftServerIp();
    ctx.reply(`Public: ${data.local_ip}:25565\nLocal: ${data.public_ip}:25565`);
  }
}
