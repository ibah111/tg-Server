import { Controller } from '@nestjs/common';
import YtdlPageService from './ydtl-page.service';

@Controller('ytdl')
export default class YtdlPageController {
  constructor(private readonly ytdlPageService: YtdlPageService) {}
}
