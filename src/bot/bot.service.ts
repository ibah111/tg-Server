import { Injectable } from '@nestjs/common';
import { OllamaService } from 'src/modules/ollama/ollama.service';
import { Context } from 'telegraf';

export class CustomContext extends Context {
  payload: string;
}

@Injectable()
export default class BotService {
  constructor(private readonly ollamaService: OllamaService) {}

  async onStart(ctx: Context) {
    const welcomeMessage = `
🤖 Привет! Я ваш Telegram бот.

Доступные команды:
/start - показать это сообщение
/ollama - работа с Ollama AI

Для получения помощи используйте команду /help
`.trim();

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
    console.log('message', ctx);
  }
}
