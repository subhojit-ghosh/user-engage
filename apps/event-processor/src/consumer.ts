import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'event-processor',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'event-processor-group' });

export async function runConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'events.raw', fromBeginning: true });
  console.log('Consumer connected and subscribed to events.raw');

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log(`Received event: ${JSON.stringify(event)}`);
    },
  });
}
