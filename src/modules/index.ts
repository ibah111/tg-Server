import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.module';
import { CronModule } from './cron/Cron.module';
import IpModule from './ip/ip.module';

@Module({ imports: [DatabaseModule, CronModule, IpModule] })
export class ModuleOfModules {}
