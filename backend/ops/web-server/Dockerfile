FROM node:9
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN mkdir -p /app
WORKDIR /app

COPY .babelrc .
COPY config.js .
COPY package.json .
COPY webpack.config.js .
COPY yarn.lock .

COPY frontend frontend
COPY backend backend

RUN yarn --pure-lockfile && yarn cache clean
RUN yarn run dev

EXPOSE 8000
