FROM node:alpine

# need to specify workdir, see: https://stackoverflow.com/questions/57534295/npm-err-tracker-idealtree-already-exists-while-creating-the-docker-image-for
WORKDIR /app

RUN apk update && \
    apk add git

RUN git config --global url."https://".insteadOf git://

# see: https://github.com/webpack/webpack/issues/14532

# copy uncommonly changed dependencies
COPY package.json .

RUN yarn

COPY public ./public

COPY src ./src

EXPOSE 3000

CMD yarn start
