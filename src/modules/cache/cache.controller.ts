import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CacheService } from './cache.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Cache')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  @ApiOperation({ summary: 'Set cache value' })
  @ApiResponse({ status: 200, description: 'Value successfully set' })
  set(
    @Body('key') key: string,
    @Body('value') value: any,
    @Body('ttl') ttl?: number,
  ) {
    return this.cacheService.set(key, value, ttl);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cache values' })
  @ApiResponse({ status: 200, description: 'Return all cache values' })
  getAll() {
    return this.cacheService.getAll();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get cache value by key' })
  @ApiResponse({ status: 200, description: 'Return cache value' })
  get(@Param('key') key: string) {
    return this.cacheService.get(key);
  }

  @Put(':key')
  @ApiOperation({ summary: 'Update cache value' })
  @ApiResponse({ status: 200, description: 'Value successfully updated' })
  update(
    @Param('key') key: string,
    @Body('value') value: any,
    @Body('ttl') ttl?: number,
  ) {
    return this.cacheService.update(key, value, ttl);
  }

  @Delete(':key')
  @ApiOperation({ summary: 'Delete cache value' })
  @ApiResponse({ status: 200, description: 'Value successfully deleted' })
  delete(@Param('key') key: string) {
    return this.cacheService.delete(key);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get cache statistics' })
  @ApiResponse({ status: 200, description: 'Return cache statistics' })
  getStats() {
    return this.cacheService.getStats();
  }
}
