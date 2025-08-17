//  {
//       "name": "gpt-oss:20b",
//       "model": "gpt-oss:20b",
//       "modified_at": "2025-08-16T17:21:26.3642476+03:00",
//       "size": 13780173724,
//       "digest": "aa4295ac10c3afb60e6d711289fc6896f5aef82258997b9efdaed6d0cc4cd8b8",
//       "details": {
//         "parent_model": "",
//         "format": "gguf",
//         "family": "gptoss",
//         "families": [
//           "gptoss"
//         ],
//         "parameter_size": "20.9B",
//         "quantization_level": "MXFP4"
//       }
//     },
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Details {
  @ApiProperty({
    description: 'Parent model',
    example: 'gpt-oss:20b',
  })
  parent_model: string;
  @ApiProperty({
    description: 'Format',
    example: 'gguf',
  })
  format: string;
  @ApiProperty({
    description: 'Family',
    example: 'gptoss',
  })
  family: string;
  families: string[];
  @ApiProperty({
    description: 'Parameter size',
    example: '20.9B',
  })
  parameter_size: string;
  @ApiProperty({
    description: 'Quantization level',
    example: 'MXFP4',
  })
  quantization_level: string;
}

export class Models {
  @ApiProperty({
    description: 'Name',
    example: 'gpt-oss:20b',
  })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Model',
    example: 'gpt-oss:20b',
  })
  model: string;
  @ApiProperty({
    description: 'Modified at',
    example: '2025-08-16T17:21:26.3642476+03:00',
  })
  modified_at: string;
  @ApiProperty({
    description: 'Size',
    example: 13780173724,
  })
  size: number;
  @ApiProperty({
    description: 'Digest',
    example: 'aa4295ac10c3afb60e6d711289fc6896f5aef82258997b9efdaed6d0cc4cd8b8',
  })
  digest: string;
  @ApiProperty({
    description: 'Details',
  })
  details: Details;
}
export class TagsResponce {
  @ApiProperty({
    description: 'Models',
    type: [Models],
  })
  models: Models[];
}
