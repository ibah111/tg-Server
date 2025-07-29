import { Body, Controller, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptDto } from './dto/gpt.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('GPT')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('generate-text')
  async generateText(@Body() body: GptDto) {
    return this.gptService.generateText(body);
  }
}
