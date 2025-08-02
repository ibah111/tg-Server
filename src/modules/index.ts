import { Module } from '@nestjs/common';
import DatabaseModule from '../databases/database.module';
import IpModule from './ip/ip.module';
import { CacheModule } from './cache/cache.module';
import { OllamaModule } from './ollama/ollama.module';

@Module({
  imports: [DatabaseModule, IpModule, CacheModule, OllamaModule],
})
export class ModuleOfModules {}
