FROM node:14
WORKDIR /webstikomcki-backed
COPY package.json .

ARG MONGODB
ARG JWTTOKEN
ENV MONGODB=$MONGODB
ENV JWTTOKEN=$JWTTOKEN

RUN npm install
COPY . .
CMD node server.js