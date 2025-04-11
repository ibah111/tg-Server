import { Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import { CacheOptions } from './cache.interface';

@Module({
  controllers: [CacheController],
  providers: [
    {
      provide: CacheService,
      useFactory: () => {
        const options: CacheOptions = {
          maxSize: 100 * 1024 * 1024, // 100MB
          defaultTTL: 1, // 1 час
        };
        return new CacheService(options);
      },
    },
  ],
  exports: [CacheService],
})
export class CacheModule {}
