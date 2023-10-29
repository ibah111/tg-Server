import { Ctx, Scene, SceneEnter, SceneLeave } from 'nestjs-telegraf';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene(process.env.YT_DOWNLOAD_VIDEO)
export class VideoDownloadScene {
  @SceneEnter()
  async onEnter(@Ctx() ctx: SceneContext) {
    ctx.reply('Вход в сцену скачивания видео', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Назад',
              callback_data: 'back',
            },
          ],
        ],
      },
    });
  }
  @SceneLeave()
  async back(@Ctx() ctx: SceneContext) {
    ctx.scene.leave().then(() =>
      ctx.reply('Возврат в предыдущее меню').then(() => {
        ctx.deleteMessage();
        /** вход в downloader */
        ctx.scene.enter(process.env.YT_DOWNLOAD_SCENE_ID);
      }),
    );
  }
}
