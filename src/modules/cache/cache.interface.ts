export interface CacheItem<T = any> {
  value: T;
  ttl: number;
  createdAt: number;
}

export interface CacheOptions {
  maxSize?: number; // максимальный размер кэша в байтах
  defaultTTL?: number; // дефолтный TTL в часах
}
