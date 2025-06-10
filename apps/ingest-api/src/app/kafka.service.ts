import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka, logLevel, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(KafkaService.name);
  private kafka: Kafka;
  private producer: Producer;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const broker = this.configService.get('KAFKA_BROKER') as string;

    this.kafka = new Kafka({
      clientId: 'ingest-api',
      brokers: [broker],
      logLevel: logLevel.DEBUG,
    });

    this.producer = this.kafka.producer();
    await this.producer.connect();
    this.logger.log(`Connected to Kafka broker at ${broker}`);
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async sendMessage(topic: string, message: any) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(message),
        },
      ],
    });
  }
}
