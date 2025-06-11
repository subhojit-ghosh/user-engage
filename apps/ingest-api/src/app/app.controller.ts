import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { format } from 'date-fns';
import { EventDto } from './dto';
import { KafkaService } from './kafka.service';
import { SourceGuard } from './source.guard';

@Controller()
export class AppController {
  constructor(private readonly kafkaService: KafkaService) {}

  @UseGuards(SourceGuard)
  @HttpCode(HttpStatus.OK)
  @Post('events')
  async events(@Body() body: EventDto) {
    await this.kafkaService.sendMessage('events.raw', {
      ...body,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss.SSS'),
    });
    return 'OK';
  }
}
