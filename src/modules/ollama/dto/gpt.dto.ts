import { ApiProperty } from '@nestjs/swagger';

export class OllamaGenerateInput {
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
  context?: number[];

  @ApiProperty({
    description: 'Whether to stream the response',
    example: false,
  })
  stream: boolean;
}

export class OllamaGenerateOutput {
  model: string;
  created_at: Date;
  response: string;
  done: boolean;
  done_reason: string;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}
