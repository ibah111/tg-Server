import { Module } from '@nestjs/common';
import { ModuleOfModules } from './modules';

@Module({
  imports: [ModuleOfModules],
})
export class AppModule {}
