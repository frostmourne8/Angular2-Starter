FROM node

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app
ADD . /usr/src/app

RUN npm run test:single
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "startServer" ]
