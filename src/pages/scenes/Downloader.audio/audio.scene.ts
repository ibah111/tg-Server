import { Ctx, Scene } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene('YT_DOWNLOAD_AUDIO')
export class AudioDownloadScene {
  async onEnter() {}
  async leave(@Ctx() ctx: SceneContext) {
    ctx.scene.leave();
  }
}
