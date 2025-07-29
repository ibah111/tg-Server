import { Module } from '@nestjs/common';
import DatabaseModule from '../databases/database.module';
import IpModule from './ip/ip.module';
import { CacheModule } from './cache/cache.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [DatabaseModule, IpModule, CacheModule, GptModule],
})
export class ModuleOfModules {}
