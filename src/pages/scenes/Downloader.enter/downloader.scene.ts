import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { Update } from 'telegraf/typings/core/types/typegram';
import { SceneContext } from 'telegraf/typings/scenes';

@Scene('YT_DOWNLOAD_SCENE_ID')
export class DownloadScene {
  @SceneEnter()
  async enter(@Ctx() ctx: SceneContext) {
    ctx.reply('Выберите тип скачивания: ', {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: 'Аудио',
              callback_data: 'mp3',
            },
          ],
          [
            {
              text: 'Видео',
              callback_data: 'mp4',
            },
          ],
          [
            {
              text: 'Отмена',
              callback_data: 'cancel',
            },
          ],
        ],
      },
    });
  }

  @Action('mp3')
  async audioDl(@Ctx() ctx: SceneContext) {
    // ctx.reply('Отправьте ссылку на скачивание аудио');
    ctx.scene.enter('YT_DOWNLOAD_AUDIO');
  }

  @Action('mp4')
  async videoDl(@Ctx() ctx: SceneContext) {
    // ctx.reply('Отправьте ссылку на скачивание видео');
    ctx.scene.enter('YT_DOWNLOAD_VIDEO');
  }
  @Action('cancel')
  async sceneLeave(
    @Ctx() ctx: SceneContext & { update: Update.CallbackQueryUpdate },
  ) {
    const cbQuery = ctx.update.callback_query;

    ctx.scene.leave().then(() => {
      ctx.reply('Отмена', {
        reply_markup: {
          remove_keyboard: true,
        },
      });
    });
  }
}
