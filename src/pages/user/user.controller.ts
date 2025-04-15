import { Body, Controller, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { UserService } from './User.service';

export class ManualSendMessageDto {
  @ApiProperty({
    description: 'ID пользователя',
    default: '',
    example: '1234567890',
  })
  id: string;
  @ApiProperty({
    description: 'Сообщение',
    example: 'Привет, как дела?',
    default: '',
  })
  message: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('manual_send_message')
  async manualSendMessage(@Body() body: ManualSendMessageDto) {
    return this.userService.manualSendMessage(body);
  }
}
