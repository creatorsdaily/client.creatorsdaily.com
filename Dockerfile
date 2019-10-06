FROM node:12.0.0 as base
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./
RUN yarn --production

FROM base as builder
WORKDIR /app
RUN yarn
COPY . .
RUN yarn build

FROM base
WORKDIR /app
COPY . .
COPY --from=builder /app/.next ./.next
EXPOSE 3000
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
CMD ["yarn", "start"]
