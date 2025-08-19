# RabbitMQ Node.js Producer & Consumer Demo

This project demonstrates a simple **RabbitMQ setup** with **Node.js producer and consumer** using Docker Compose. It includes:

* **RabbitMQ broker**
* **Node.js producer and consumer services**

You can run the full system using **prebuilt Docker images**, so no local Node.js project files are required if images are already built.

---

## 📂 Project Structure

If building locally, your project might look like this:

```
.
├── Dockerfile          # Node.js Dockerfile for producer/consumer
├── docker-compose.yml  # Compose file for RabbitMQ, producer, consumer
├── package.json        # Node.js dependencies
├── server.js           # Producer API
└── consumer.js         # Consumer script
```

When using prebuilt images, local Node.js files are optional.

---

## 🚀 Running the Project

1. **Clone the repository (if you have it locally)**

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

2. **Start all services using Docker Compose**

```bash
docker-compose up -d
```

* `-d` runs containers in the background.
* If using prebuilt images, make sure the `docker-compose.yml` points to your Docker Hub images for `producer` and `consumer`.

3. **Check container status**

```bash
docker-compose ps
```

* Ensure all containers are **up and healthy**.

4. **View real-time logs**

```bash
docker-compose logs -f
```

* This will show logs for **producer**, **consumer**, and **RabbitMQ**.

5. **Access Producer API**

* By default, the producer runs on `http://localhost:3000`.
* Example: send a message to RabbitMQ:

```bash
curl -X POST http://localhost:3000/send \
-H "Content-Type: application/json" \
-d '{"message":"Hello RabbitMQ"}'
```

6. **Check Consumer Logs**

* The consumer automatically prints messages it receives from RabbitMQ.

---

## 🔧 Stopping and Cleaning Up

Stop all containers:

```bash
docker-compose down
```

Optional: remove volumes (data will be lost):

```bash
docker-compose down -v
```

---

## ⚡ Notes

* **Prebuilt Docker Images**:

  * `producer` and `consumer` can be stored in Docker Hub and reused.
  * No local Node.js project files are required if using images.

* **Automatic restart**: `restart: always` ensures services stay up.

* **Persistence**: Add Docker volumes if you want RabbitMQ data to persist across restarts.

---

## 🐳 Sample `docker-compose.yml` Using Images

```yaml
version: "3.9"

services:
  rabbitmq:
    image: rabbitmq:3-management
    container_name: rabbitmq
    ports:
      - "5672:5672"
      - "15672:15672"

  producer:
    image: your-dockerhub-username/rabbitmq-demo:latest
    container_name: producer
    ports:
      - "3000:3000"
    environment:
      - RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672

  consumer:
    image: your-dockerhub-username/rabbitmq-demo:latest
    container_name: consumer
    command: ["node", "consumer.js"]
    environment:
      - RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672 
```

---

This README is now **complete, clear, and beginner-friendly**, showing how to run the full RabbitMQ project **locally or entirely with Docker images**.
