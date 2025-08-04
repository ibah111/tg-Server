import { ApiProperty } from '@nestjs/swagger';

export interface CacheItem<T = any> {
  value: T;
  ttl: number;
  createdAt: number;
}

export interface CacheOptions {
  maxSize?: number; // максимальный размер кэша в байтах
  defaultTTL?: number; // дефолтный TTL в минутах
}

export class SetCacheDto {
  @ApiProperty({
    description: 'Ключ кэша',
    example: 'user_data_123',
    type: String,
  })
  key: string;

  @ApiProperty({
    description: 'Значение для кэширования',
    example: { id: 1, name: 'Test User', email: 'test@example.com' },
    type: 'any',
  })
  value: any;

  @ApiProperty({
    description: 'Время жизни кэша в минутах (по умолчанию 1 минута)',
    example: 2,
    required: false,
    type: Number,
  })
  ttl?: number;
}

export class UpdateCacheDto {
  @ApiProperty({
    description: 'Новое значение для кэширования',
    example: { id: 1, name: 'Updated User', email: 'updated@example.com' },
    type: 'any',
  })
  value: any;

  @ApiProperty({
    description: 'Время жизни кэша в минутах (по умолчанию 1 минута)',
    example: 3,
    required: false,
    type: Number,
  })
  ttl?: number;
}

export class CacheStatsDto {
  @ApiProperty({
    description: 'Текущий размер кэша в байтах',
    example: 1024000,
    type: Number,
  })
  size: number;

  @ApiProperty({
    description: 'Максимальный размер кэша в байтах',
    example: 104857600,
    type: Number,
  })
  maxSize: number;

  @ApiProperty({
    description: 'Количество элементов в кэше',
    example: 150,
    type: Number,
  })
  items: number;
}
