FROM node:18.16

WORKDIR /app

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "index.html", "./"]

RUN yarn

COPY . .

RUN yarn build

COPY "public" "./public"

EXPOSE 8000

CMD ["yarn", "start"]
