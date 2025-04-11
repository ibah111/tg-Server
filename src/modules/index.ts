import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.module';
import { CronModule } from './cron/cron.module';
import IpModule from './ip/ip.module';
import { CacheModule } from './cache/cache.module';

@Module({ imports: [DatabaseModule, CronModule, IpModule, CacheModule] })
export class ModuleOfModules {}
