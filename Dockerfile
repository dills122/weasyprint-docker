FROM mhart/alpine-node:12
MAINTAINER Dylan Steele "dylansteele57@gmail.com"

RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN apk --update --upgrade add bash cairo pango gdk-pixbuf py3-cffi py3-pillow py-lxml
RUN pip3 install weasyprint
COPY . ./src
RUN cd /src; npm install

WORKDIR /src

EXPOSE 3000
CMD ["node", "/src/index.js"]