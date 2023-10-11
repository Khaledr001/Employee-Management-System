FROM node:18-alpine

WORKDIR /code

ADD package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
