import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { GptDto } from './dto/gpt.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { openai_instance } from 'src/shared/utils/request-instance';

@Injectable()
export class GptService {
  private readonly logger = new Logger(GptService.name);
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async generateText(dto: GptDto) {
    const { prompt } = dto;

    try {
      const url = '/chat/completions';
      const response = await openai_instance.post(
        url,
        {
          model: 'gpt-4o',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );
      return response.data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
