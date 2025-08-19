FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Default entry → producer (server.js)
CMD ["node", "server.js"]
