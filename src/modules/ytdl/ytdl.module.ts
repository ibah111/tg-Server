import { Global, Module } from '@nestjs/common';
import YtdlService from './ytdl.service';

@Global()
@Module({
  providers: [YtdlService],
  exports: [YtdlService],
})
export class YtdlModule {}
