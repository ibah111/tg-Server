import {
  Injectable,
  InternalServerErrorException,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { OllamaGenerateDto } from './dto/gpt.dto';
import { ConfigService } from '@nestjs/config';
import { ollamaInstance } from 'src/shared/utils/axios-instance';

@Injectable()
export class OllamaService implements OnModuleInit {
  private readonly logger = new Logger(OllamaService.name);
  private readonly apiKey: string;

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async onModuleInit() {
    this.logger.verbose('GptService initialized');
    console.log('Token: '.yellow, this.apiKey);
  }

  throwError(error: any) {
    this.logger.error('Error getting tags', error);
    console.error(error.response?.data || error.message);
    throw new InternalServerErrorException(
      error.response?.data || error.message,
    );
  }

  async tags() {
    try {
      const response = await ollamaInstance.get('/tags');
      return response.data;
    } catch (error) {
      this.throwError(error);
    }
  }

  async generate(dto: OllamaGenerateDto) {
    const { model, prompt, context, stream } = dto;

    try {
      const response = await ollamaInstance.post('/generate', {
        model,
        prompt: `Behave yourself as cat which being annoyed when people asking him about something. Always answer in language of prompt.\n
          promt: ${prompt}`,
        context,
        stream,
      });
      return response.data;
    } catch (error) {
      this.throwError(error);
    }
  }
}
