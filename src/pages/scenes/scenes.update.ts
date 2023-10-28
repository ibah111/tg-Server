import { Command, Ctx, Update } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class ScenesUpdate {
  @Command('download')
  async greeterScene(@Ctx() ctx: SceneContext) {
    /**
     * Принимает id зарегистрированных сцен
     */
    const scene_id = process.env.YT_DOWNLOAD_SCENE_ID;
    await ctx.scene.enter(scene_id);
  }
}
