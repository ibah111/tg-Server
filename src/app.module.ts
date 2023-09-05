import { Module } from '@nestjs/common';
import { ModuleOfModules } from './modules';
import { PagesModule } from './pages/index.module';

@Module({
  imports: [ModuleOfModules, PagesModule],
})
export class AppModule {}
