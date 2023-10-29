import { Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene(process.env.YT_DOWNLOAD_AUDIO)
export class AudioDownloadScene {
  @SceneEnter()
  async onEnter(@Ctx() ctx: SceneContext) {
    ctx.reply('Вход в сцену скачивания аудио');
  }
  @SceneLeave()
  async leave(@Ctx() ctx: SceneContext) {
    ctx.scene.leave();
  }
}
