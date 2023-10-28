import { Module } from '@nestjs/common';
import { UserModule } from './User/User.module';
import { ScenesModule } from './scenes/scenes.module';

@Module({
  imports: [UserModule, ScenesModule],
})
export class PagesModule {}
