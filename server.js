const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

let channel;
const queue = "email_tasks";
const RABBIT_URL = process.env.RABBITMQ_URL || "amqp://localhost";

async function connectQueue() {
  try {
    const connection = await amqp.connect(RABBIT_URL);
    channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    console.log("✅ Producer connected to RabbitMQ");
  } catch (err) {
    console.error("❌ Producer failed to connect:", err.message);
  }
}

app.post("/task", async (req, res) => {
  const { email, subject, body } = req.body;
  const msg = JSON.stringify({ email, subject, body });

  channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
  console.log("📤 Task queued:", msg);

  res.json({ status: "queued", data: { email, subject } });
});

app.listen(3000, () => {
  console.log("🚀 Producer API running on http://localhost:3000");
  connectQueue();
});
