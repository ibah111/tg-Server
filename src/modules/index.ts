import { Module } from '@nestjs/common';
import DatabaseModule from '../databases/database.module';
import { CronModule } from './cron/cron.module';
import IpModule from './ip/ip.module';
import { CacheModule } from './cache/cache.module';
import { GptModule } from './gpt/gpt.module';

@Module({
  imports: [DatabaseModule, CronModule, IpModule, CacheModule, GptModule],
})
export class ModuleOfModules {}
