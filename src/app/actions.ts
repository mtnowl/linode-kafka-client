'use server';
import { Kafka } from 'kafkajs';
import { revalidatePath } from 'next/cache';
import { cache } from 'react';

const kafka = new Kafka({
  clientId: 'my-kafka-client',
  brokers: ['127.0.0.1:9092'],
  // brokers: ['45.79.170.237:9092'],
});

export const produce = async () => {
  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: 'test-topic',
    messages: [{ value: `Hello at ${new Date().toLocaleTimeString()}` }],
  });

  await producer.disconnect();

  revalidatePath('/');
};

function delay(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

export const consume = cache(async () => {
  const consumer = kafka.consumer({ groupId: 'test-group' });

  await consumer.connect();
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
  let messages: string[] = [];

  consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const value = message.value?.toString();
      if (value) messages.push(value);
    },
  });
  await delay(10000);
  await consumer.disconnect();
  return messages;
});
