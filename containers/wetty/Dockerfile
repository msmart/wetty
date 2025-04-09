FROM node:18-alpine as builder
RUN apk add -U build-base python3 py3-pip python3-dev py3-setuptools
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install
RUN yarn build

FROM node:18-alpine
LABEL maintainer="butlerx@notthe.cloud"
WORKDIR /usr/src/app
ENV NODE_ENV=production
EXPOSE 3000
COPY --from=builder /usr/src/app/build /usr/src/app/build
COPY --from=builder /usr/src/app/node_modules /usr/src/app/node_modules
COPY package.json /usr/src/app
RUN apk add -U coreutils openssh-client sshpass && \
    mkdir ~/.ssh

ENTRYPOINT ["yarn", "start"]
