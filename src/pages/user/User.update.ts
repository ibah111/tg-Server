/* eslint-disable prettier/prettier */
import { Hears, Sender, Start, Update, Command, Ctx } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { UserService } from './User.service';
export const HELLO_SCENE_ID = 'HELLO_SCENE_ID';
@Update()
export class GreeterUpdate {
  constructor(private readonly service: UserService) {}

  @Start()
  onStart(@Ctx() ctx: Context) {
    return this.service.start(ctx);
  }

  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }

  @Command('scene')
  async onSceneCommand(@Ctx() ctx: Context): Promise<void> {
    await ctx.scene.enter(HELLO_SCENE_ID);
  }
}
