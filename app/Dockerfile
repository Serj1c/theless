FROM node:12.16.2

LABEL maintainer="varkadov@theless.ru"

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

CMD if [ "$ENV" = "development" ]; then \
        yarn dev -p 3100; \
    else \
        yarn build && \
        yarn start -p 3100; \
    fi
