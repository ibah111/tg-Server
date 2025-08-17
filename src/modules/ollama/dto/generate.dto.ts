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
  @ApiProperty({
    description: 'The model used for text generation',
    example: 'llama3',
  })
  model: string;

  @ApiProperty({
    description: 'The date and time the response was created',
    example: '2025-08-16T17:21:26.3642476+03:00',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The response from the model',
    example: 'Hello, how are you?',
  })
  response: string;

  done: boolean;

  @ApiProperty({
    description: 'The reason the response was done',
    example: 'stop',
  })
  done_reason: string;

  @ApiProperty({
    description: 'The context used for text generation',
    example: [1, 2, 3],
  })
  context: number[];

  @ApiProperty({
    description: 'The total duration of the response',
    example: 1000,
  })
  total_duration: number;

  @ApiProperty({
    description: 'The duration of the response',
    example: 1000,
  })
  load_duration: number;

  @ApiProperty({
    description: 'The number of times the prompt was evaluated',
    example: 10,
  })
  prompt_eval_count: number;

  @ApiProperty({
    description: 'The duration of the prompt evaluation',
    example: 1000,
  })
  prompt_eval_duration: number;

  @ApiProperty({
    description: 'The number of times the evaluation was done',
    example: 10,
  })
  eval_count: number;

  @ApiProperty({
    description: 'The duration of the evaluation',
    example: 1000,
  })
  eval_duration: number;
}
