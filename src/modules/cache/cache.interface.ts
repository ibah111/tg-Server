export interface CacheItem<T = any> {
  value: T;
  ttl: number;
  createdAt: number;
}

export interface CacheOptions {
  maxSize?: number; // максимальный размер кэша в байтах
  defaultTTL?: number; // дефолтный TTL в часах
}

export class SetCacheDto {
  key: string;
  value: any;
  ttl?: number;
}

export class UpdateCacheDto {
  value: any;
  ttl?: number;
}

export class CacheStatsDto {
  size: number;
  maxSize: number;
  items: number;
}
