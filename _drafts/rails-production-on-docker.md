---
layout: post
title: ถึงเวลาปล่อยแอพพลิเคชั่นด้วย Docker
---

พัฒนาแอพด้วย **Ruby on Rails** มาสักสามสี่โปรเจค เมื่อจะติดตั้งสำหรับ Production ก็จะทำแบบ manual ทั้งหมด ทั้งที่ตอนแรกก็ตั้งใจจะใช้ **Docker** จนมาถึงโปรเจคล่าสุดก็ได้ใช้สักที<!--more--> โดยถ้าลองค้นหาวิธีสร้าง **Dockerfile** ในอินเทอร์เน็ต ส่วนมากก็จะเจอ **Dockerfile** ที่คล้ายๆ กับตัวอย่างด้านล่าง ซึ่งเป็นรูปแบบที่ง่ายที่สุด

## Simple Dockerfile

```Dockerfile
# Use the Ruby 2.7.2-slim image from Docker Hub
# as the base image (https://hub.docker.com/_/ruby)
FROM ruby:2.7.2-slim

# User /app for store application
WORKDIR /app

# Copy all files into the /app
COPY . /app

# Run bundle install to install the Ruby dependencies.
RUN bundle install

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y yarn

# Run yarn install to install JavaScript dependencies.
RUN yarn install --check-files

# Set "rails server -b 0.0.0.0" as the command to
# run when this container starts.
CMD ["rails", "server", "-b", "0.0.0.0"]
```

## References:
- [Sample Rails Application](https://docs.docker.com/compose/rails/)
- [How to Dockerize a Rails Application](https://www.codewithjason.com/dockerize-rails-application/)
