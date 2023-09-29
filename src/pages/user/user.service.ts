/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/modules/database/local.database/models/User.model';
import { Context } from 'telegraf';

export class UserService {
  constructor(
    @InjectModel(Users, 'local')
    private readonly modelUser: typeof Users,
  ) {}
  async start(ctx: Context) {
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

  async killAttempt(ctx: Context) {
    return await this.modelUser
      .findOne({
        where: {
          id_telegram: ctx.from.id,
        },
      })
      .then(async (user) => {
        user.update({
          ban_status: true,
        });
        ctx.reply('Пытался убить меня, дурила?\nОтныне ты в бане ушлепок!');
        ctx.replyWithSticker('');
      });
  }
}
