const amqp = require("amqplib");

const queue = "email_tasks";
const RABBIT_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function connectQueue(retries = 10) {
  while (retries) {
    try {
      const connection = await amqp.connect(RABBIT_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(queue, { durable: true });

      console.log("✅ Consumer connected, waiting for messages...");

      channel.consume(queue, (msg) => {
        if (msg !== null) {
          const content = msg.content.toString();
          console.log("📩 Received:", content);
          channel.ack(msg);
        }
      });
      return;
    } catch (err) {
      console.error("❌ Consumer error:", err.message);
      retries -= 1;
      console.log(`⏳ Retrying in 5s... (${retries} retries left)`);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
  console.error("❌ Could not connect to RabbitMQ, exiting.");
  process.exit(1);
}

connectQueue();
