FROM node:10
MAINTAINER Dylan Steele "dylansteele57@gmail.com"

COPY ./setup.sh ./
RUN chmod +x ./setup.sh
RUN ./setup.sh
COPY . ./src
RUN cd /src; npm install

WORKDIR /src

EXPOSE 3000
CMD ["node", "/src/index.js"]