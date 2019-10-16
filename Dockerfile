FROM node:12.0.0 as base
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./
RUN yarn --production

FROM base as builder
ARG API
ARG GRAPHQL
ARG UPLOAD
ARG FILES
ARG NAME
ARG SLOGAN
ARG DESCRIPTION
ARG KEYWORDS
ENV API $API
ENV GRAPHQL $GRAPHQL
ENV UPLOAD $UPLOAD
ENV FILES $FILES
ENV NAME $NAME
ENV SLOGAN $SLOGAN
ENV DESCRIPTION $DESCRIPTION
ENV KEYWORDS $KEYWORDS
WORKDIR /app
RUN yarn
COPY . .
RUN yarn build

FROM base
WORKDIR /app
COPY . .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public/service-worker.js ./public/service-worker.js
EXPOSE 3000
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
CMD ["yarn", "start"]
