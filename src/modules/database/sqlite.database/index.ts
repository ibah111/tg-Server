import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { models } from './models';
import { SqliteDatabaseSeed } from './seed';
import { Users } from './models/User.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      name: 'local',
      dialect: 'sqlite',
      storage: 'database.sqlite',
      models,
    }),
    SequelizeModule.forFeature([Users], 'local'),
  ],
  providers: [SqliteDatabaseSeed],
})
export default class SqliteDatabase {}
