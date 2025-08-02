import { Module } from '@nestjs/common';
import YtdlPageController from './ytdl-page.controller';
import YtdlPageService from './ydtl-page.service';

@Module({
  controllers: [YtdlPageController],
  providers: [YtdlPageService],
})
export default class YtdlPageModule {}
