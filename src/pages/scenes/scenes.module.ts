import { Module } from '@nestjs/common';
import { ScenesUpdate } from './scenes.update';
import { DownloadScene } from './Downloader.enter/downloader.scene';

@Module({
  providers: [ScenesUpdate, DownloadScene],
})
export class ScenesModule {}
