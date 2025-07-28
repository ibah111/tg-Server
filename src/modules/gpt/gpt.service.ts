import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { GptDto } from './dto/gpt.dto';

@Injectable()
export class GptService {
  constructor(private readonly openai: OpenAI) {}

  async generateText(dto: GptDto) {
    const { model, prompt } = dto;
    const response = await this.openai.chat.completions.create({
      model,
      messages: [{ role: 'user', content: prompt }],
    });
    return response.choices[0].message.content;
  }
}
