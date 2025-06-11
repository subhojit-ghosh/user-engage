import { createKeyv } from '@keyv/redis';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaService } from './kafka.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        KAFKA_BROKER: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
      }),
      isGlobal: true,
      cache: true,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          stores: [createKeyv(configService.get<string>('REDIS_URL'))],
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, KafkaService],
})
export class AppModule {}
