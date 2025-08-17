import { Body, Controller, Get, Post } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { OllamaGenerateInput, OllamaGenerateOutput } from './dto/generate.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TagsResponce } from './dto/tags.dto';

@ApiTags('Ollama')
@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @ApiResponse({
    status: 200,
    description: 'List all available models',
    type: TagsResponce,
  })
  @ApiOperation({ summary: 'List all available models' })
  @Get('tags')
  async getTags(): Promise<TagsResponce> {
    return this.ollamaService.tags();
  }

  @ApiResponse({
    status: 200,
    description: 'Generate text with model',
    type: OllamaGenerateOutput,
  })
  @ApiOperation({ summary: 'Generate text with model' })
  @Post('generate')
  async generate(
    @Body() body: OllamaGenerateInput,
  ): Promise<OllamaGenerateOutput> {
    return this.ollamaService.generate(body);
  }
}
