import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './User.service';
import { ManualSendMessageDto } from './dto/class.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('manual-send-message')
  async manualSendMessage(@Body() body: ManualSendMessageDto) {
    return this.userService.manualSendMessage(body);
  }
}
