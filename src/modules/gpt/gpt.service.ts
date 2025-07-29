import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { GptDto } from './dto/gpt.dto';

@Injectable()
export class GptService {
  private readonly logger = new Logger(GptService.name);

  constructor(private readonly openai: OpenAI) {}

  async generateText(dto: GptDto) {
    const { model, prompt } = dto;

    try {
      this.logger.log(`Generating text with model: ${model}`);

      const response = await this.openai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: prompt }],
      });

      this.logger.log('Text generated successfully');
      return response.choices[0].message.content;
    } catch (error) {
      this.logger.error(`Error generating text: ${error.message}`, error.stack);

      if (error.status === 403) {
        throw new Error(
          'Access denied. Please check your API key and proxy configuration.',
        );
      }

      throw error;
    }
  }
}
