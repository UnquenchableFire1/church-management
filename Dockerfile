FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production
COPY server ./server
COPY client ./client
EXPOSE 3000
WORKDIR /app/server
CMD ["node", "server.js"]
