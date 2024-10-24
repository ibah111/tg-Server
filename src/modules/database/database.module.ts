import { Module } from '@nestjs/common';
import SqliteDatabase from './sqlite.database';

@Module({
  imports: [SqliteDatabase],
})
export default class DatabaseModule {}
