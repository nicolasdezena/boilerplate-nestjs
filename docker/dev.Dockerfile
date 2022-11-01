FROM  node:14-alpine

WORKDIR /app

COPY . /app

RUN yarn install --pure-lockfile

EXPOSE 3000 9229

CMD [ "yarn","run","start:debug" ]
