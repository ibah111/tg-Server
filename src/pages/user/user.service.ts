import { InjectModel } from '@nestjs/sequelize';
import { createReadStream } from 'fs';
import { InjectBot } from 'nestjs-telegraf';
import { join } from 'path';
import { Users } from 'src/modules/database/sqlite.database/models/User.model';
import { Context as TelegrafContext } from 'telegraf';
import { Telegraf } from 'telegraf';
import { ManualSendMessageDto } from './user.controller';

export class UserService {
  constructor(
    @InjectBot() private readonly bot: Telegraf,
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
  private readonly fuckyouUsername: string[] = [
    //  'NewChatUser'
  ];
  private readonly fuckyouId: number[] = [
    //400657207
  ];
  async onText(ctx: TelegrafContext) {
    const username = ctx.from.username;
    const id = ctx.from.id;
    console.log('username', ctx);
    console.log('ctx.from', ctx.from);
    console.log('ctx.chat', ctx.chat);
    if (
      this.fuckyouUsername.includes(username) ||
      this.fuckyouId.includes(id)
    ) {
      const message_id = ctx.message.message_id;
      const filePath = join(__dirname, '../../../', 'assets', 'fuckyou.MOV');
      const fileStream = createReadStream(filePath);
      ctx.replyWithAnimation(
        {
          source: fileStream,
        },
        {
          reply_parameters: {
            message_id,
          },
          caption: `${ctx.from.first_name} ${ctx.from.last_name}, пошёл нахуй!`,
        },
      );
    }
  }

  async manualSendMessage(body: ManualSendMessageDto) {
    const { id, message } = body;
    await this.bot.telegram.sendMessage(id, message);
  }
}
