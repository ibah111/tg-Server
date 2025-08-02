import { Module } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { HttpModule } from '@nestjs/axios';
import { OllamaController } from './ollama.controller';

@Module({
  imports: [HttpModule],
  providers: [OllamaService],
  exports: [OllamaService],
  controllers: [OllamaController],
})
export class OllamaModule {}
