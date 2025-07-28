import { Global, Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [GptService],
  exports: [GptService],
})
export class GptModule {}
