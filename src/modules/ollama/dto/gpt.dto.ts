import { ApiProperty } from '@nestjs/swagger';

export class OllamaGenerateDto {
  @ApiProperty({
    description: 'The model to use for text generation',
    example: 'llama3',
  })
  model: string;

  @ApiProperty({
    description: 'The prompt to generate text',
    example: 'Hello, how are you?',
  })
  prompt: string;

  @ApiProperty({
    description: 'The context to use for text generation',
    example: [1, 2, 3],
  })
  context: number[];

  @ApiProperty({
    description: 'Whether to stream the response',
    example: false,
  })
  stream: boolean;
}
