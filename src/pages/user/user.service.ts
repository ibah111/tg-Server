/* eslint-disable prettier/prettier */
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/modules/database/local.database/models/User.model';
import { Context } from 'telegraf';

export class UserService {
  constructor(
    @InjectModel(Users, 'local')
    private readonly modelUser: typeof Users,
  ) {}
  async start(ctx: Context, {}) {
    const user = await this.modelUser.findOne({
      where: {
        id_telegram: ctx.from.id,
      },
    });
    if (!user) {
      ctx.reply(`Я тебя не знаю, давай знакомиться ${ctx.from.first_name}`);
      try {
        const {} = {};
        await this.modelUser.create(
          {},
          {
            logging: console.log,
          },
        );
      } catch (error) {
        console.log(error);
        throw Error;
      }
    }
  }
}
