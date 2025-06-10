import { Kafka } from 'kafkajs';
import { clickhouse } from './clickhouse';

const kafka = new Kafka({
  clientId: 'event-processor',
  brokers: [process.env.KAFKA_BROKER],
});

const consumer = kafka.consumer({
  groupId: 'event-processor-group',
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  groupInstanceId: 'event-processor-1',
});

export async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'events.raw', fromBeginning: false });
  console.log('Consumer connected and subscribed to events.raw');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = JSON.parse(message.value.toString());
      console.log(`Received event: ${JSON.stringify(value, null, 2)}`);
      try {
        await clickhouse.insert({
          table: 'events_raw',
          format: 'JSONEachRow',
          values: [
            {
              name: value.event,
              data: value.data,
              timestamp: value.timestamp,
            },
          ],
        });
      } catch (err) {
        console.error('ClickHouse insert failed:', err);
      }
    },
  });
}
