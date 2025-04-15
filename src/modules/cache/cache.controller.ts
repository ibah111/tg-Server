import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CacheService } from './cache.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { SetCacheDto, UpdateCacheDto, CacheStatsDto } from './cache.interface';

@ApiTags('Cache')
@Controller('cache')
export class CacheController {
  constructor(private readonly cacheService: CacheService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Set cache value' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Value successfully set',
    type: Boolean,
  })
  @ApiBody({ type: SetCacheDto })
  set(@Body() dto: SetCacheDto) {
    return this.cacheService.set(dto.key, dto.value, dto.ttl);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cache values' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all cache values',
    type: Object,
  })
  getAll() {
    return this.cacheService.getAll();
  }

  @Get(':key')
  @ApiOperation({ summary: 'Get cache value by key' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return cache value',
    type: Object,
  })
  @ApiParam({ name: 'key', type: String })
  get(@Param('key') key: string) {
    return this.cacheService.get(key);
  }

  @Put(':key')
  @ApiOperation({ summary: 'Update cache value' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Value successfully updated',
    type: Boolean,
  })
  @ApiParam({ name: 'key', type: String })
  @ApiBody({ type: UpdateCacheDto })
  update(@Param('key') key: string, @Body() dto: UpdateCacheDto) {
    return this.cacheService.update(key, dto.value, dto.ttl);
  }

  @Delete(':key')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete cache value' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Value successfully deleted',
    type: Boolean,
  })
  @ApiParam({ name: 'key', type: String })
  delete(@Param('key') key: string) {
    return this.cacheService.delete(key);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get cache statistics' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return cache statistics',
    type: CacheStatsDto,
  })
  getStats() {
    return this.cacheService.getStats();
  }
}
