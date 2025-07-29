import { Module } from '@nestjs/common';
import MinecraftModule from './minecraft/minecraft.module';

@Module({
  imports: [MinecraftModule],
})
export class PagesModule {}
