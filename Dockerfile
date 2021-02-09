FROM node:latest as base

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM base as test
RUN npm install -g mocha
CMD [ "mocha", "tests", "--reporter", "spec" ]

FROM base as dev
EXPOSE 3000
CMD [ "npm", "start" ]
