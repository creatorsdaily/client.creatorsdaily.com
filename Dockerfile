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
ARG ONE_SIGNAL_APP_ID
ARG PRODUCT_ID
ARG DOMAIN
ARG GRAPHQL_WS
ARG CLOSE_TIP
ENV API=$API GRAPHQL=$GRAPHQL UPLOAD=$UPLOAD FILES=$FILES NAME=$NAME SLOGAN=$SLOGAN DESCRIPTION=$DESCRIPTION KEYWORDS=$KEYWORDS ONE_SIGNAL_APP_ID=$ONE_SIGNAL_APP_ID PRODUCT_ID=$PRODUCT_ID DOMAIN=$DOMAIN GRAPHQL_WS=$GRAPHQL_WS CLOSE_TIP=$CLOSE_TIP
WORKDIR /app
RUN yarn
COPY . .
RUN yarn possible-types
RUN yarn build

FROM base
WORKDIR /app
COPY . .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public/service-worker.js ./public/service-worker.js
EXPOSE 3000
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime 
CMD ["yarn", "start"]
