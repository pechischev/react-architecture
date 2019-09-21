FROM node:10-alpine

RUN apk add --no-cache \
    autoconf \
    automake \
    bash \
    g++ \
    libc6-compat \
    libjpeg-turbo-dev \
    libpng-dev \
    make \
    nasm

COPY ./ /usr/src/app
WORKDIR /usr/src/app

RUN yarn install
RUN yarn run init:packages
WORKDIR /usr/src/app/modules/components
RUN yarn install
WORKDIR /usr/src/app


