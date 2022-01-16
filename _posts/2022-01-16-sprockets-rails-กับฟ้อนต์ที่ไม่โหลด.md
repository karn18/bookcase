---
layout: post
title: Sprockets Rails กับฟ้อนต์ที่ไม่โหลด
description: เมื่อใช้ sprockets-rails แล้วฟ้อนต์ที่เคยใช้งานได้อยู่ไม่โหลด เกิดขึ้นเพราะอะไรและจะแก้ไขอย่างไรมาดูกัน
author: Karn
tags:
- rails
- sprockets
- LFP
categories: dev
cover: "/assets/images/posts/2022/sprockets-rails-กับฟ้อนต์ที่ไม่โหลด/cover.png"
image:
  path: "/assets/images/posts/2022/sprockets-rails-กับฟ้อนต์ที่ไม่โหลด/cover.png"
  width: 1200
  height: 800
date: 2022-01-16 09:58 +0700
---
หลังจากที่โปรเจ็คหลายๆ ตัวได้อัพเวอร์ชันมาใช้ **Rails 7** อีกสิ่งหนึ่งที่ได้รับผลกระทบตามมาคือการจัดการ asset ต่างๆ ที่อยู่ภายใน ซึ่งใน **Rails 7** เปิดทางเลือกให้ผู้พัฒนาเลือกใช้เครื่องมือในการจัดการ **JavaScript** และ **CSS** ใดๆ ก็ได้ที่ถนัด 

สำหรับเราเอง เราเลือกใช้ gem `sprockets` มาแต่ไหนแต่ไร เพียงแต่ในเวอร์ชัน 7 เราจะต้องอัพเดตการใช้งานจาก `sprockets` มาเป็น `sprockets-rails` เพียงแต่สิ่งที่เราเจอคือฟ้อนต์ต่างๆ ที่เราอ้างอิงไว้ในไฟล์ **CSS** ไม่ถูกโหลดเมื่อนำไปใช้งานจริง (Production) 

ถ้าย้อนกลับไปที่การอ้างอิง asset ต่างๆ ใน **CSS** ตอนที่เรายังใช้ `sprockets` จะมี helper ให้ใช้งานอยู่ไม่ว่าจะเป็น `asset-path|asset-url`, `image-path|image-url`, `font-path|font-url` โดยการอ้างอิงฟ้อนต์ที่เราใช้อยู่จะเป็นดังตัวอย่างด้านล่าง

```css
  @font-face {
    ...
    src: font-url("IBMPlexSansThai-Regular.woff2") format("woff2");
  }
```

จะเห็นได้ว่าเราเรียกใช้ helper `font-url` ในการอ้างอิง URL เมื่อถูก compile ด้วยคำสั่ง `rails assets:precompile` จะถูกแปลงเป็น

```css
  @font-face {
    ...
    src: url("/assets/IBMPlexSansThai-Regular-8cb267db96213347f522e3bc8a04822009fd83e45718c40f933a5aeb33d22446.woff2") format("woff2");
  }
```

แต่เมื่อเปลี่ยนมาใช้ `sprockets-rails` ปรากฏว่าเมื่อสั่ง compile จะได้ออกมาเหมือนเดิม ซึ่ง `font-url` ไม่ใช้ syntax ที่ **CSS** รู้จัก จึงทำให้ฟ้อนต์ไม่ถูกโหลดมาใช้งาน

จากที่ได้เข้าไปดูใน[โค้ด](https://github.com/rails/sprockets-rails/blob/master/lib/sprockets/rails/asset_url_processor.rb) ปรากฏว่าจริงๆ แล้วเราไม่จำเป็นต้องใช้ helper อีกต่อไป เพราะตัว processor ใหม่จะตรวจจับจาก `url()` ที่อยู่ใน **CSS** และจัดการใส่ URL ที่ถูกต้องเข้าไป

![](/assets/images/posts/2022/sprockets-rails-กับฟ้อนต์ที่ไม่โหลด/asset_url_processor.png){:width="600px"}
*AssetUrlProcessor*


ดังนั้นต่อไปนี้ถ้าเราจะอ้างถึง asset ใดๆ ที่อยู่ใน `CSS` ก็ให้เรียกผ่าน `url()` ได้เลย ดังตัวอย่างด้านล่าง

```css
  @font-face {
    ...
    src: url("IBMPlexSansThai-Regular.woff2") format("woff2");
  }
```

## References
- [Sprockets](https://github.com/rails/sprockets)
- [Sprockets Rails](https://github.com/rails/sprockets-rails)
