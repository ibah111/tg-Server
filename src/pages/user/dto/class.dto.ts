import { ApiProperty } from '@nestjs/swagger';

export class ManualSendMessageDto {
  @ApiProperty({
    description: 'ID пользователя',
    example: '1234567890',
  })
  id: string;
  @ApiProperty({
    description: 'Сообщение',
    example: 'Привет, как дела?',
  })
  message: string;
}
