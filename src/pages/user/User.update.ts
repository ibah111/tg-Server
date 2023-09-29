/* eslint-disable prettier/prettier */
import { Hears, Sender, Start, Update, Command, Ctx } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { UserService } from './User.service';
export const HELLO_SCENE_ID = 'HELLO_SCENE_ID';
@Update()
export class GreeterUpdate {
  constructor(private readonly service: UserService) {}

  /**
   *
   * @param ctx
   * @returns регистрирует юзера
   */
  @Start()
  onStart(@Ctx() ctx: Context) {
    return this.service.start(ctx);
  }

  /**
   *
   * @param ctx
   * @returns банит чела
   */
  @Command('kill')
  async killAttempt(@Ctx() ctx: Context) {
    return this.service.killAttempt(ctx);
  }

  /**
   * Дефолтный hears, оставлю на будущее
   * @param firstName
   * @returns
   */
  @Hears(['hi', 'hello', 'hey', 'qq'])
  onGreetings(@Sender('first_name') firstName: string): string {
    return `Hey ${firstName}`;
  }
}
