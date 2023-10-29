import { Module } from '@nestjs/common';
import { ScenesUpdate } from './scenes.update';
import { DownloadScene } from './Downloader/downloader.enter';
import { AudioDownloadScene } from './Downloader/downloader.audio';
import { VideoDownloadScene } from './Downloader/downloader.video';
/**
 * импорт сцен сюда
 */
@Module({
  providers: [ScenesUpdate],
  imports: [DownloadScene, VideoDownloadScene, AudioDownloadScene],
})
export class ScenesModule {}
