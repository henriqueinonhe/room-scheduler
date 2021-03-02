FROM node:lts-alpine

WORKDIR /home/app

COPY . .

RUN npm ci

EXPOSE 80

WORKDIR /home/app/src

CMD ["node", "index.js"]