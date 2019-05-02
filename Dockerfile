FROM node:9

RUN mkdir /code
WORKDIR /code
COPY ./package.json .

RUN npm install
EXPOSE 3000

CMD npm run start