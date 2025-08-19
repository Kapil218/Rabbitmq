<!-- 
docker-compose up --build

curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{"email":"test@user.com","subject":"Hello","body":"RabbitMQ works!"}' 
  
  


Docker Hub only stores images (like your Node.js app image). docker-compose.yml is not stored in Docker Hub — that’s something you keep in your repo (GitHub/GitLab/etc.) or locally. So what we publish to Docker Hub is your Node.js app image built from the Dockerfile.RabbitMQ itself doesn’t need to be pushed to Docker Hub because the official image rabbitmq:3-management already exists there.

we can prepare both producer and consumer run from the same image (as in our Dockerfile now), or can also prefer two separate images (rabbitmq-producer, rabbitmq-consumer) for clarity.

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
-->
