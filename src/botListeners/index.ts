import { Context } from 'telegraf';
import { bot } from '../configs/bot';

bot.start((ctx) => {
  const tgUser = {
    first_name: ctx.from.first_name,
    last_name: ctx.from.last_name,
    username: ctx.from.username,
  };
});
