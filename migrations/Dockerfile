FROM node:12.16.2

LABEL maintainer="varkadov@theless.ru"

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD yarn migrate
