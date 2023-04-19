FROM node:18.16

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", "./"]

RUN yarn

COPY . .

RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]
