import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { OllamaGenerateInput, OllamaGenerateOutput } from './dto/gpt.dto';
import { ollamaInstance } from 'src/shared/utils/axios-instance';

@Injectable()
export class OllamaService {
  private readonly logger = new Logger(OllamaService.name);

  constructor() {}

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

  async generate(dto: OllamaGenerateInput): Promise<OllamaGenerateOutput> {
    const { model, prompt, context, stream } = dto;
    try {
      const response = await ollamaInstance.post('/generate', {
        model,
        prompt,
        context,
        stream,
      });
      return response.data;
    } catch (error) {
      this.throwError(error);
    }
  }
}
