FROM node:14
WORKDIR /webstikomcki-backed
COPY package.json .

ENV MONGODB=mongodb://host.docker.internal:27017/website_stikomckid
ENV JWTTOKEN=xPt3S^Zb[]~*pxBJ*~#F%E~8'rMY/NL_)4WtW_uE?kfbGGC~x`w;tmH/C*Faf(_.uS~'Dj^sk~kRxMGUz4vH%4f@wM@C

RUN npm install
COPY . .
CMD node server.js