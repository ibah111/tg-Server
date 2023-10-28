/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/sequelize';
import { stickers } from 'src/json';
import { Users } from 'src/modules/database/local.database/models/User.model';
import { Context as TelegrafContext } from 'telegraf';

export class UserService {
  constructor(
    @InjectModel(Users, 'local')
    private readonly modelUser: typeof Users,
  ) {}
  async start(ctx: TelegrafContext) {
    const user = await this.modelUser.findOne({
      where: {
        id_telegram: ctx.from.id,
      },
    });
    if (!user) {
      ctx.reply(`Я тебя не знаю, давай знакомиться ${ctx.from.first_name}`);
      await this.modelUser
        .create({
          id_telegram: ctx.message.from.id,
          username: ctx.message.from.username,
          ban_status: false,
        })
        .then(async (data) => {
          const registredUser = await this.modelUser.findOne({
            where: {
              id: ctx.from.id,
            },
          });
          console.log('data ', data);
          console.log('registredUser', registredUser);
          ctx.reply(
            `${ctx.from.username} ты был зарегистрирован в базе под id ${data.id}, \nРада знакомству ${ctx.from.first_name}`,
          );
        });
    } else if (user) {
      ctx.reply(`Чел, я тебя знаю. Твой id=${user.id}`);
      if (user.ban_status === false) {
        ctx.reply(
          'И по скольу ты пока не забанен, ты можешь пользоваться моим функционалом',
        );
      } else if (user.ban_status === true) {
        ctx.reply('Ты в бане, а значит ДОС мужик.');
      }
    }
  }

  async killAttempt(ctx: TelegrafContext) {
    console.log(ctx.message, 'penis');
    ctx
      .replyWithSticker(
        'CAACAgIAAxkBAAIDSWU9BR1Vgc93aLckexGxJP8UtUKUAAKaOAACcqvxSf-74b6QSDk7MAQ',
      )
      .then(
        () => async () =>
          await this.modelUser
            .findOne({
              where: {
                id_telegram: ctx.from.id,
              },
            })
            .then(async (user) => {
              user.update({
                ban_status: true,
              });
              ctx.reply(
                'Пытался убить меня, дурила?\nОтныне ты в бане ушлепок!',
              );
            }),
      );
  }
  /**
   * TODO Доделать тег на конкретный чат/беседу
   * @param ctx
   * @returns
   */
  async tagAll(ctx: TelegrafContext) {
    if (ctx.message.chat.type !== 'private')
      return await this.modelUser.findAll().then((users) => {
        ctx.reply('ПРОСЫПАЕМСЯ РЕБЯТУЛЬКИ!!!');
        for (const user of users) {
          ctx.reply(`@${user.username}`);
        }
      });
    else if (ctx.message.chat.type === 'private')
      ctx.reply(
        'Вы не можете тегнуть пользователей чата в личном диалоге с ботом.',
      );
  }

  shareGitHub(ctx: TelegrafContext) {
    ctx.reply('Cсылка на гитхаб: https://github.com/ibah111/Server');
  }

  async stickerAnswer(ctx: TelegrafContext) {
    return (await ctx.replyWithSticker(stickers.box_cat)).sticker;
  }

  async unknownMessage(ctx: TelegrafContext) {
    console.log(ctx.message);
    return 'Meow <3';
  }

  /**
   *
   * @param link
   */
  async ytDl_function(link: string) {
    return link;
  }
}
