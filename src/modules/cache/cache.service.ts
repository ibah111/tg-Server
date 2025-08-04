import { Injectable, OnModuleInit } from '@nestjs/common';
import { CacheItem, CacheOptions } from './cache.interface';

@Injectable()
export class CacheService implements OnModuleInit {
  private cache: Map<string, CacheItem> = new Map();
  private maxSize: number;
  private defaultTTL: number;
  private currentSize: number = 0;
  private cleanupInterval: NodeJS.Timeout;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize || 100 * 1024 * 1024; // 100MB по умолчанию
    this.defaultTTL = (options.defaultTTL || 1) * 60 * 1000; // 60 секунд по умолчанию
  }

  onModuleInit() {
    // Добавляем тестовый объект по умолчанию
    this.set('test_key', {
      message: 'Это тестовый объект кэша',
      timestamp: new Date().toISOString(),
      data: {
        id: 1,
        name: 'Test Object',
        description: 'Объект для тестирования кэша'
      }
    });

    // Запускаем очистку каждую минуту
    this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.createdAt > item.ttl) {
        this.delete(key);
      }
    }
  }

  private calculateSize(value: any): number {
    try {
      return Buffer.byteLength(JSON.stringify(value));
    } catch {
      return 0;
    }
  }

  private ensureSpace(requiredSize: number): boolean {
    if (this.currentSize + requiredSize <= this.maxSize) {
      return true;
    }

    // Удаляем старые элементы, пока не освободим место
    const sortedEntries = Array.from(this.cache.entries()).sort(
      (a, b) => a[1].createdAt - b[1].createdAt,
    );

    for (const [key] of sortedEntries) {
      this.delete(key);
      if (this.currentSize + requiredSize <= this.maxSize) {
        return true;
      }
    }

    return false;
  }

  set<T>(key: string, value: T, ttl?: number): boolean {
    const itemSize = this.calculateSize(value);
    if (!this.ensureSpace(itemSize)) {
      return false;
    }

    const cacheItem: CacheItem<T> = {
      value,
      ttl: ttl ? ttl * 60 * 1000 : this.defaultTTL, // TTL в секундах
      createdAt: Date.now(),
    };

    this.cache.set(key, cacheItem);
    this.currentSize += itemSize;
    return true;
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key) as CacheItem<T>;
    if (!item) return null;

    if (Date.now() - item.createdAt > item.ttl) {
      this.delete(key);
      return null;
    }

    return item.value;
  }

  getAll(): Record<string, any> {
    const result: Record<string, any> = {};
    const now = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (now - item.createdAt <= item.ttl) {
        result[key] = item.value;
      } else {
        this.delete(key);
      }
    }

    return result;
  }

  update<T>(key: string, value: T, ttl?: number): boolean {
    if (!this.cache.has(key)) {
      return false;
    }

    const oldItem = this.cache.get(key);
    const newItemSize = this.calculateSize(value);
    const oldItemSize = this.calculateSize(oldItem.value);

    if (
      newItemSize > oldItemSize &&
      !this.ensureSpace(newItemSize - oldItemSize)
    ) {
      return false;
    }

    const cacheItem: CacheItem<T> = {
      value,
      ttl: ttl ? ttl * 60 * 1000 : this.defaultTTL, // TTL в секундах
      createdAt: Date.now(),
    };

    this.cache.set(key, cacheItem);
    this.currentSize += newItemSize - oldItemSize;
    return true;
  }

  delete(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return false;

    const itemSize = this.calculateSize(item.value);
    this.cache.delete(key);
    this.currentSize -= itemSize;
    return true;
  }

  getStats() {
    return {
      size: this.currentSize,
      maxSize: this.maxSize,
      items: this.cache.size,
    };
  }
}
