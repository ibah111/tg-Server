import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../../modules/database/local.database/models/user.model';
import { bot } from '../../main';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User, 'local')
    private readonly modelUser: typeof User,
  ) {}
  createUserOnStart() {
    bot.start(async (ctx) => {
      const user = await this.modelUser.findOne({
        where: {
          username: ctx.from.username,
        },
      });
      if (user)
        ctx.reply(
          `Привет, ${ctx.from.username}, мы уже знакомы поэтому ты зарегистрирован`,
        );
      if (!user)
        return await this.modelUser.create(
          {
            ban_status: false,
            first_name: ctx.from.first_name,
            username: ctx.from.username,
            id_telegram: ctx.from.id,
          },
          {
            logging: console.log,
          },
        );
    });
  }
}
