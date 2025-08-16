import { Injectable, Logger } from '@nestjs/common';
import { ChatRepository } from 'src/databases/sqlite.database/repository';
import UserRepository from 'src/databases/sqlite.database/repository/user.repository';
import { OllamaService } from 'src/modules/ollama/ollama.service';
import { Context } from 'telegraf';

export class CustomContext extends Context {
  payload: string;
}

@Injectable()
export default class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(
    private readonly ollamaService: OllamaService,
    private readonly userRepository: UserRepository,
    private readonly chatRepository: ChatRepository,
  ) {}

  private async checkCtx(ctx: Context) {
    const ctx_from = ctx.from;
    const ctx_chat = ctx.chat;

    const user = await this.userRepository.findById(ctx_from.id);
    if (!user) {
      this.logger.warn(
        `User with id "${ctx_from.id}" not found. Creating row.`.yellow,
        ctx_from,
      );
      await this.userRepository.createUser({
        telegram_id: ctx_from.id,
        is_bot: ctx_from.is_bot,
        first_name: ctx_from.first_name,
        last_name: ctx_from.last_name,
        username: ctx_from.username,
        language_code: ctx_from.language_code,
        is_premium: ctx_from.is_premium,
      });
    }

    const chat = await this.chatRepository.findById(ctx_chat.id);
    if (!chat) {
      this.logger.warn(
        `Chat with id "${ctx_chat.id}" not found. Creating row.`.yellow,
        ctx_chat,
      );
      await this.chatRepository.createChat({
        telegram_chat_id: ctx_chat.id,
        first_name: ctx_from.first_name as string,
        last_name: ctx_from.last_name as string,
        username: ctx_from.username as string,
        type: ctx_chat.type as string,
      });
    }
  }

  async onStart(ctx: Context) {
    const welcomeMessage = `
🤖 Привет! Я ваш Telegram бот.

Доступные команды:
/start - показать это сообщение
/ollama - работа с Ollama AI

Для получения помощи используйте команду /help
`.trim();
    console.log('onStart ctx data'.yellow, ctx.from, ctx.message);
    console.log('other'.yellow, ctx);
    const user = await this.userRepository.findById(ctx.from.id);
    if (!user) {
      const userData = {
        telegram_id: ctx.from.id,
        is_bot: ctx.from.is_bot,
        first_name: ctx.from.first_name,
        last_name: ctx.from.last_name,
        username: ctx.from.username,
        language_code: ctx.from.language_code,
        is_premium: ctx.from.is_premium,
      };
      await this.userRepository.createUser(userData);
    }
    await ctx.reply(welcomeMessage);
  }

  async onHelp(ctx: Context) {
    const helpMessage = `
📚 Справка по командам бота:

/start - приветственное сообщение
/help - показать эту справку
/ollama - работа с Ollama AI

💡 Если у вас есть вопросы, обратитесь к администратору.
    `.trim();

    await ctx.reply(helpMessage);
  }

  async ollama(ctx: Context) {
    ctx.reply('Resetting prev session...');

    const custom_ctx = ctx as CustomContext;

    const prompt = custom_ctx.payload;

    const response = await this.ollamaService.generate({
      model: 'llama3',
      prompt,
      stream: false,
    });

    const reply = response.response;

    await ctx.reply(reply);
  }

  async message(ctx: Context) {
    this.logger.log('onMessage'.yellow, ctx.from.username);
    await this.checkCtx(ctx);
  }
}
