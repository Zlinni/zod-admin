FROM 1195494025/node-pnpm:16.17.1-8.6.0 AS builder 
ENV PROJECT_ENV production
# 设置时区为北京时间
ENV TZ=Asia/Shanghai \
    DEBIAN_FRONTEND=noninteractive

RUN ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime 
RUN date

# 使用缓存
WORKDIR /code
ADD package.json pnpm-lock.yaml .npmrc /code/
RUN pnpm install
RUN pwd && ls

ADD . /code
RUN pnpm run build-only

FROM nginx  
RUN apt-get update -y && apt install -y iputils-ping telnet 
COPY --from=builder /code/dist/ /usr/share/nginx/html  
COPY --from=builder /code/deploy/nginx/nginx.conf /etc/nginx/conf.d/default.conf  

