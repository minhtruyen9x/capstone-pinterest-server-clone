FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN chmod +x wait-for

EXPOSE 3000

CMD ["node","/app/src/index.js"]