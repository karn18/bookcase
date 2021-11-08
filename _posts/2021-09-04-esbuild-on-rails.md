---
layout: post
title: Esbuild on Rails
author: Karn
tags:
- ruby
- rails
- esbuild
- webpack
categories: dev
cover: "/assets/images/posts/2021/esbuild-on-rails/cover.png"
image:
  path: "/assets/images/posts/2021/esbuild-on-rails/cover.png"
  width: 1200
  height: 630
date: 2021-09-04 11:09 +0700
---

ตลอดระยะเวลา 2 ปีที่ผ่านมา **Webpack** ได้ถูกนำเข้ามาเป็นตัว build โค้ดใน **Rails** แต่คาดว่าใน **Rails** เวอร์ชัน 7 คงจะมีการปลดประจำการ **Webpack** ออกไปให้เป็น optional แล้วอะไรหละที่จะมาแทน **Webpack** ก็อย่างที่ได้เห็นแล้วในชื่อบทความนั้นก็คือ **esbuild** นั้นเอง<!--more-->


> โดยความเห็นส่วนตัว แล้ว **Webpack** เคยเป็นเครื่องมือที่น่าตื่นตาตื่นใจสมัยที่ออกมาใหม่ แต่ด้วยที่พอมีการอัพเดตเวอร์ชันใหม่ ก็มีทั้งการตั้งค่า ปลั๊กอิน โหลดเดอร์ต่างๆ ที่พัฒนาและปรับเปลี่ยนไป ทำให้รู้สึกว่า **Webpack** นั้นก็ยุ่งยากพอสมควรสำหรับมือใหม่เลยทีเดียว และใช้เวลาในการ build ค่อนข้างนาน

ในบทความนี้เราจะมาใช้ gem `esbuild-rails` ซึ่งเพิ่งถูกปล่อยออกมา (เวอร์ชัน 0.1.2) กับ **Rails** เวอร์ชัน 6 กันดู เพราะถ้าย้อนกลับไปในบทความ[การใช้งาน Importmap บน Rails 6]({% post_url 2021-08-18-using-importmap-on-rails-6 %}) การใช้ importmap อาจจะไม่เหมาะกับบางสถานการณ์

- เริ่มต้นสร้างแอพใหม่

  ```bash
  $ rails new ice_mocha --skip-javascript --skip-spring
  ```

- เพิ่ม gem `esbuild-rails` เข้าไปใน Gemfile

  ```ruby
  # Gemfile
  gem "esbuild-rails"
  ```

- รันคำสั่งติดตั้ง

  ```bash
  $ ./bin/bundle install
  $ ./bin/rails esbuild:install
  ```

![esbuild:install](/assets/images/posts/2021/esbuild-on-rails/esbuild-install.png){:width="600px"}
*rails esbuild:install*

จะเห็นว่าสิ่งที่เแปลกตาไปคือการสร้างไฟลเดอร์ `app/assets/esbuilds` ขึ้นมา ซึ่งจะใช้สำหรับเก็บไฟล์ Javascript ที่ถูก build แล้วไว้ ถ้าเราอยากได้โฟลเดอร์เป็นอย่างอื่นก็ได้ทำได้ แต่ต้องเข้าไปแก้ไขในไฟล์ `app/assets/config/manifest.js` ให้ชื่อตรงกับโฟลเดอร์ที่เราเปลี่ยนด้วย

```javascript
//= link_tree ../images
//= link_directory ../stylesheets .css
//= link_tree ../esbuilds .js # 👈 change folder name HERE!
```

- มาลองอะไรง่ายๆ โดยใช้ `confetti` เพื่อแสดงพลุบนหน้าเว็บกัน

  ```bash
  $ npm install --save canvas-confetti
  ```

- สร้างหน้าเว็บสำหรับทดสอบขึ้นมา

  ```bash
  $ ./bin/rails generate controller Pages index
  ```

- รันคำสั่ง build ไฟล์ Javascript

  ```bash
  $ npm run build
  # esbuild app/javascript/application.js  --outfile=app/assets/esbuilds/application.js --bundle
  ```

![npm:run:build](/assets/images/posts/2021/esbuild-on-rails/npm-run-build.png){:width="800px"}
*npm run build*

- เปิดเว็บขึ้นมาทดสอบ

{% raw %}
<div class="video">
  <video controls playsinline>
    <source src="/assets/videos/esbuild_confetti.mov" type="video/mp4">
  </video>
</div>
{% endraw %}

มาลองเปรียบเทียบระหว่าง **Webpack** และ **esbuild** กันแบบคร่าวๆ หลังจากผ่าน precompile

![esbuild:install](/assets/images/posts/2021/esbuild-on-rails/esbuild-production.png){:width="600px"}
*esbuild*

![esbuild:install](/assets/images/posts/2021/esbuild-on-rails/webpack-production.png){:width="600px"}
*webpack*

ทั้งนี้การเปรียบเทียบอาจจะไม่ค่อยละเอียดมากนัก แต่ถ้าดูจากข้อมูลที่มีก็จะเห็นได้ว่าทั้งเวลา และขนาดที่ได้จากการคอมไพล์ด้วย **esbuild** ให้ประสิทธิภาพที่ดีกว่า

ในช่วง development แนะนำให้ใช้ **Procfile** เพื่อรันเว็บและรันคำสั่ง build แบบ watch mode จะดีกว่า

```ruby
# Procfile
web: ./bin/rails server
build: npm run build -- --watch
```

ถ้าจะเอาไปรันบน production จริง เราก็จะเรียกใช้ `./bin/rails assets:precompile` แต่ก็ต้องไปปรับแก้ค่าของ `esbuild` ให้เหมาะสมอีกทีหนึ่ง เช่น minify, sourcemap ซึ่งสามารถเข้าไปดู option ต่างๆ ได้[ที่นี่](https://esbuild.github.io/api/#simple-options)

> สำหรับ `esbuild-rails` ที่นำมาใช้งานนี้ยังเป็นเวอร์ชันแรกๆ ซึ่งอาจจะมีการเปลี่ยนแปลงอีกในอนาคต เพื่อให้การใช้งานสะดวกมากยิ่งขึ้น ยังไงก็ลองไปติดตามกันดู

ยังไงซะ เดี่ยวจะนำไปใช้งานบน production จริงแล้วจะเอาผลการใช้งานมาเล่าให้ฟังกันอีกทีนะครับ


‼️👋 `esbundling-rails` ได้ปรับให้เป็นส่วนหนึ่งของ `jsbundling-rails` แทนแล้ว

## References
- ~~[esbuild-rails](https://github.com/rails/esbuild-rails)~~
- [jsbundling](https://github.com/rails/jsbundling-rails)
- [esbuild](https://esbuild.github.io/)
