FROM node:18.16

WORKDIR /app

# copy uncommonly changed dependencies
COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY public ./public

COPY src ./src

EXPOSE 3000

CMD yarn start
