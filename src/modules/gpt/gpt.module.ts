import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { HttpModule } from '@nestjs/axios';
import { GptController } from './gpt.controller';

@Module({
  imports: [HttpModule],
  providers: [GptService],
  exports: [GptService],
  controllers: [GptController],
})
export class GptModule {}
