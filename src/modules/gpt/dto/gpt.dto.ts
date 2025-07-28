import { ApiProperty } from '@nestjs/swagger';

export class GptDto {
  @ApiProperty({
    description: 'The model to use for text generation',
    example: 'gpt-4o-mini',
  })
  model: string;

  @ApiProperty({
    description: 'The prompt to generate text',
    example: 'Hello, how are you?',
  })
  prompt: string;
}
