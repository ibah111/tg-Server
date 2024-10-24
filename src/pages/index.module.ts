import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';
import MinecraftModule from './minecraft/minecraft.module';

@Module({
  imports: [UserModule, MinecraftModule],
})
export class PagesModule {}
