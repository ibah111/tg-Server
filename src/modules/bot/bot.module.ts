import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { sessionMiddleWare } from 'src/shared/utils/session-middleware';
import MinecraftUpdate from 'src/pages/minecraft/minecraft.update';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        token: config.get<string>('tokens.telegram'),
        middlewares: [sessionMiddleWare],
        include: [MinecraftUpdate],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TelegrafModule],
})
export class BotModule {}
