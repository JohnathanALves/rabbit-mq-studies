import amqp from "amqplib";

const QUEUE = "consumer_2";

const EXCHANGE = "EVENTS";

async function main() {
  const connection = await amqp.connect("amqp://localhost");

  const channel = await connection.createChannel();

  await channel.assertExchange(EXCHANGE, "fanout");

  const queue = await channel.assertQueue(QUEUE);

  await channel.prefetch(1);

  await channel.bindQueue(queue.queue, EXCHANGE, "");

  channel.consume(queue.queue, (msg: amqp.ConsumeMessage | null) => {
    if (msg) {
      const content = JSON.parse(Buffer.from(msg.content).toString());
      console.log(`message received`, content);
      channel.ack(msg);
    } else {
      console.log("null?");
    }
  });

  console.log("ready to receive messages");
}

main();
