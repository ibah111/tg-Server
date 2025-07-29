import { InjectBot } from 'nestjs-telegraf';
import { Context as TelegrafContext } from 'telegraf';
import { Telegraf } from 'telegraf';
import { ManualSendMessageDto } from './dto/class.dto';
import UserRepository from 'src/databases/sqlite.database/repository/user.repository';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor(
    @InjectBot() private readonly bot: Telegraf,
    userRepository: UserRepository,
  ) {
    this.userRepository = userRepository;
  }

  async start(ctx: TelegrafContext) {
    const user = await this.userRepository.findAll(ctx.from.username);
    if (user.length === 0) {
    }
  }

  public async onText(ctx: TelegrafContext) {
    console.log('chat:', ctx.message.chat);
  }

  public async manualSendMessage(body: ManualSendMessageDto) {
    const { id, message } = body;
    await this.bot.telegram.sendMessage(id, message);
  }
}
