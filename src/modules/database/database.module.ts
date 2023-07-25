import { Module } from '@nestjs/common';
import LocalDatabase from './local.database';

@Module({
  imports: [LocalDatabase],
})
export default class DatabaseModule {}
