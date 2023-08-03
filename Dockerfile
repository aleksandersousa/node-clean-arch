FROM node:18

WORKDIR /usr/src/clean-node-api

COPY ./package.json .

RUN yarn install --only=prod

COPY ./dist ./dist

EXPOSE 5000

CMD yarn start
