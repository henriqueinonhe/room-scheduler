FROM node:lts-alpine

COPY . /home/app/

RUN cd /home/app && npm ci

EXPOSE 80

CMD ["node", "/home/app/index.js"]