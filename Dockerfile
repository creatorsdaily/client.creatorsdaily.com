FROM node:14.15.1 as base
WORKDIR /app
COPY package.json ./package.json
COPY yarn.lock ./
RUN yarn --production

FROM base as builder
ARG NEXT_PUBLIC_API
ARG NEXT_PUBLIC_GRAPHQL
ARG NEXT_PUBLIC_GRAPHQL_WS
ARG NEXT_PUBLIC_UPLOAD
ARG NEXT_PUBLIC_FILES
ARG NEXT_PUBLIC_PARSER
ARG NEXT_PUBLIC_INDEX
ARG NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_SLOGAN
ARG NEXT_PUBLIC_DESCRIPTION
ARG NEXT_PUBLIC_KEYWORDS
ARG NEXT_PUBLIC_ONE_SIGNAL_APP_ID
ARG NEXT_PUBLIC_PRODUCT_ID
ARG NEXT_PUBLIC_BAIDU_TONGJI
ARG NEXT_PUBLIC_CLOSE_TIP

RUN if [ "$NEXT_PUBLIC_API" != "" ]; \
  then export NEXT_PUBLIC_API=$NEXT_PUBLIC_API; \
  fi; \
  if [ "$NEXT_PUBLIC_GRAPHQL" != "" ]; \
  then export NEXT_PUBLIC_GRAPHQL=$NEXT_PUBLIC_GRAPHQL; \
  fi; \
  if [ "$NEXT_PUBLIC_GRAPHQL_WS" != "" ]; \
  then export NEXT_PUBLIC_GRAPHQL_WS=$NEXT_PUBLIC_GRAPHQL_WS; \
  fi; \
  if [ "$NEXT_PUBLIC_UPLOAD" != "" ]; \
  then export NEXT_PUBLIC_UPLOAD=$NEXT_PUBLIC_UPLOAD; \
  fi; \
  if [ "$NEXT_PUBLIC_FILES" != "" ]; \
  then export NEXT_PUBLIC_FILES=$NEXT_PUBLIC_FILES; \
  fi; \
  if [ "$NEXT_PUBLIC_PARSER" != "" ]; \
  then export NEXT_PUBLIC_PARSER=$NEXT_PUBLIC_PARSER; \
  fi; \
  if [ "$NEXT_PUBLIC_INDEX" != "" ]; \
  then export NEXT_PUBLIC_INDEX=$NEXT_PUBLIC_INDEX; \
  fi; \
  if [ "$NEXT_PUBLIC_NAME" != "" ]; \
  then export NEXT_PUBLIC_NAME=$NEXT_PUBLIC_NAME; \
  fi; \
  if [ "$NEXT_PUBLIC_SLOGAN" != "" ]; \
  then export NEXT_PUBLIC_SLOGAN=$NEXT_PUBLIC_SLOGAN; \
  fi; \
  if [ "$NEXT_PUBLIC_DESCRIPTION" != "" ]; \
  then export NEXT_PUBLIC_DESCRIPTION=$NEXT_PUBLIC_DESCRIPTION; \
  fi; \
  if [ "$NEXT_PUBLIC_KEYWORDS" != "" ]; \
  then export NEXT_PUBLIC_KEYWORDS=$NEXT_PUBLIC_KEYWORDS; \
  fi; \
  if [ "$NEXT_PUBLIC_ONE_SIGNAL_APP_ID" != "" ]; \
  then export NEXT_PUBLIC_ONE_SIGNAL_APP_ID=$NEXT_PUBLIC_ONE_SIGNAL_APP_ID; \
  fi; \
  if [ "$NEXT_PUBLIC_PRODUCT_ID" != "" ]; \
  then export NEXT_PUBLIC_PRODUCT_ID=$NEXT_PUBLIC_PRODUCT_ID; \
  fi; \
  if [ "$NEXT_PUBLIC_BAIDU_TONGJI" != "" ]; \
  then export NEXT_PUBLIC_BAIDU_TONGJI=$NEXT_PUBLIC_BAIDU_TONGJI; \
  fi; \
  if [ "$NEXT_PUBLIC_CLOSE_TIP" != "" ]; \
  then export NEXT_PUBLIC_CLOSE_TIP=$NEXT_PUBLIC_CLOSE_TIP; \
  fi;
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
