/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/modules/database/local.database/models/User.model';
import { Context } from 'telegraf';

export class UserService {
  constructor(
    @InjectModel(User, 'local')
    private readonly modelUser: typeof User,
  ) {}
  async start(ctx: Context) {
    const user = await this.modelUser.findOne({
      where: {
        id_telegram: ctx.from.id,
      },
    });
    if (!user) {
      ctx.reply(`Я тебя не знаю, давай знакомиться ${ctx.from.first_name}`);
      try {
        await this.modelUser.create({
          id_telegram: ctx.from.id,
          username: ctx.from.username,
          ban_status: false,
        });
      } catch (error) {
        console.log(error);
        throw Error;
      }
    }
  }
}
