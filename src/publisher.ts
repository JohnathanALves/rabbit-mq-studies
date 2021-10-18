import amqp from "amqplib";

const QUEUE = "myQueue12";

const EXCHANGE = "EVENTS";

async function main() {
  const connection = await amqp.connect("amqp://localhost");

  const channel = await connection.createChannel();

  const exchange = await channel.assertExchange(EXCHANGE, "fanout");

  //   await channel.assertQueue(QUEUE);

  await channel.prefetch(1);

  const msg = {
    timestamp: new Date(),
    owner: "John",
    fanout: true,
  };

  //   channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), {
  //     persistent: true,
  //   });

  channel.publish(exchange.exchange, "", Buffer.from(JSON.stringify(msg)));
}

main();
