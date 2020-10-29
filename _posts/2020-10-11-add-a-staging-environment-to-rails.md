---
layout: post
title: เพิ่ม Staging Environment ให้กับ Rails
author: Karn
tags:
  - environments
  - rails
  - ruby
categories: dev
cover: "/assets/images/posts/2020/add-a-staging-environment-to-rails/cover.png"
image:
  path: "/assets/images/posts/2020/add-a-staging-environment-to-rails/cover.png"
  width: 1200
  height: 630
date: 2020-10-03 16:54 +0700
---
เมื่อเราสร้าง **Rails Application** ผ่านคำสั่ง `rails` ปกติแล้วจะมาพร้อมกับ **config** ของสภาพแวดล้อม 3 รูปแบบเป็นค่ามาตรฐาน
1. Development
2. Test
3. Production
ซึ่งแต่ละสภาพแวดล้อมก็จะมีค่า **config** ต่างๆ ที่ถูกกำหนดมาให้แยกจากกัน ในโฟลเดอร์ `configs/environments/${ENV}.rb`
<!--more-->

เพียงแค่ 3 สภาพแวดล้อมโดยปกติก็เพียงพอต่อการใช้งานแล้ว **แต่ๆ**ในบางครั้งเราก็อยากรันโปรแกรมในสภาพแวดล้อมที่เหมือนจริง แต่ไม่ใช่เครื่องเซิฟเวอร์ที่ปล่อยให้คนใช้งานจริง แต่จะเป็นเครื่องเซิฟเวอร์ที่อาจจะมีคุณลักษณะใกล้เคียงของจริง ที่เรียกว่า **Staging Server**

ซึ่งถ้าเป็นลักษณะเหตุการณ์แบบนี้ ถ้าวิธีการง่ายๆ เราก็คงเลือกใช้วิธีการแก้ไข **config** จากในสภาพแวดล้อม **production** ให้ทำการเชื่อมต่อฐานข้อมูล การต่อกับ **sidekiq** การต่อกับ **redis** ที่อยู่ในเครื่อง **Stagging** แทน สำหรับวิธีการนี้ดูเหมือนจะง่ายๆ แต่พอเราเริ่มมีการอัพเดตโค้ดผ่านการใช้ **git** หรือการใช้ automation อาจจะมีปัญหาเรื่องของ **config** ได้

ดังนั้นวิธีการที่น่าจะเหมาะสมที่สุดก็คงจะเป็นการเพิ่มสภาพแวดล้อมใหม่สำหรับ **Staging** ซึ่งสามารถทำได้ดังนี้

- สร้างไฟล์ `config/environments/staging.rb` ซึ่งแนะนำให้เราก๊อบปี้ไฟล์ `config/environments/production.rb` มาเลยจะดีกว่า
- สร้างฐานข้อมูลใหม่สำหรับ **Staging** และกำหนดค่าการต่อฐานข้อมูลใน `config/database.rb` โดยการเพิ่ม **config** ของ `staging` เข้าไป

```yml
staging:
  <<: *default
  database: 'example_staging'
  host: localhost
  port: 5434
  username: postgres
  password: postgres
```

- จากนั้นในขั้นตอนการรันโปรแกรม จะต้องกำหนด **RAILS_ENV** ให้มีค่าเป็น `staging` 
เพียงเท่านี้เราก็สามารถจะรันโปรแกรมในสภาพแวดล้อม **Staging** ได้

## References:
- [https://nts.strzibny.name/creating-staging-environments-in-rails](https://nts.strzibny.name/creating-staging-environments-in-rails/)
