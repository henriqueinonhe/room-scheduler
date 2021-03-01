FROM node:lts-alpine

WORKDIR /home/app

COPY . .

RUN npm ci

EXPOSE 80

CMD ["node", "index.js"]