# http://mherman.org/blog/2017/12/07/dockerizing-a-react-app

FROM node:9
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY .babelrc .
COPY config.js .
COPY package.json .
COPY webpack.config.prod.js .
COPY webpack.config.dev.js .
COPY yarn.lock .

COPY frontend frontend
COPY backend backend

RUN yarn --pure-lockfile && yarn cache clean

EXPOSE 8000
ENV NODE_ENV production

RUN yarn run prod-build
CMD ["yarn", "run", "prod"]
