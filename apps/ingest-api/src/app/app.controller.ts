import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EventDto } from './dto';
import { KafkaService } from './kafka.service';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @HttpCode(HttpStatus.OK)
  @Post('events')
  async events(@Body() body: EventDto) {
    await this.kafkaService.sendMessage('events.raw', body);
    return 'OK';
  }
}
