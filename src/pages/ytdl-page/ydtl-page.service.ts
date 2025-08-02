import { Injectable } from '@nestjs/common';
import YtdlService from 'src/modules/ytdl/ytdl.service';

@Injectable()
export default class YtdlPageService {
  constructor(private readonly ytdlService: YtdlService) {}
}
