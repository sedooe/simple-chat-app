FROM node:8-alpine

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /app
ADD . /app

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/app/run.sh"]
CMD ["start"]