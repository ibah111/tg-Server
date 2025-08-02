import { Body, Controller, Get, Post } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { OllamaGenerateInput } from './dto/gpt.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Ollama')
@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @ApiOperation({ summary: 'List all available models' })
  @Get('tags')
  async getTags() {
    return this.ollamaService.tags();
  }

  @ApiOperation({ summary: 'Generate text with model' })
  @Post('generate')
  async generate(@Body() body: OllamaGenerateInput) {
    return this.ollamaService.generate(body);
  }
}
