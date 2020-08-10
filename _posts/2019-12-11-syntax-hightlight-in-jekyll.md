---
layout: post
title: ปรับแต่งโค้ดไฮไลท์ใน Jekyll
date: 2019-12-11 12:06 +0700
author: "Karn"
tags:
  - ruby
  - jekyll
categories: dev
cover: '/assets/images/posts/2019/syntax-hightlight-in-jekyll/thumbnail.png'
image:
  path: '/assets/images/posts/2019/syntax-hightlight-in-jekyll/thumbnail.png'
  height: 100
  width: 100
---
สำหรับการเขียนบทความที่มีการใส่โค้ดลงไปด้วยนั้น ทำให้ผู้อ่านได้เห็นตัวอย่างเข้าใจเนื้อหาเกี่ยวกับการเขียนโปรแกรมได้ดียิ่งขึ้น หรือแม้กระทั่งเป็นตัวอย่างเพื่อนำไปพัฒนาต่อยอดได้ ซึ่ง **Jekyll** ก็รองรับการแสดงผลโค้ดไฮไลท์เอาไว้ด้วย <!--more-->

**[Rough](http://rouge.jneen.net)** คือไลบราลีในภาษา **Ruby** ที่ถูกนำมาใช้ใน **Jekyll** ซึ่งรองรับภาษาโปรแกรมมากถึง 176 ภาษา โดยใน **Rough** ถูกตั้งเป็นค่ามาตรฐานการใช้งานใน **Jekyll** ตั้งแต่เวอร์ชัน 3 เป็นต่อมา

## หลักการทำงาน
**Rough** จะแปลงโค้ดที่อยู่ใน Markdown ออกมาเป็น HTML ต่างๆ ขึ้นอยู่กับ **Token** หรือจะอธิายให้เข้าใจง่ายๆ ก็คือองค์ประกอบแต่ละส่วนของโค้ดที่แตกต่างๆ กันออกไป เช่น Keyword, Variable, Whitespace หรือ Error เป็นต้น ซึ่งสามารถดูรายการ Token ได้จาก [ที่นี่](https://github.com/rouge-ruby/rouge/wiki/List-of-tokens)

Token แต่ละตัวเมื่อถูกแปลงออกมาแล้วจะมี stylesheet ตามรายการ Token Shortname โดยเราจะต้องนำ stylesheet ของ Token ทั้งหมดมาใส่ไว้ใน `main.scss` เพื่อให้ **Jekyll** ทำการแสดงผลไฮไลท์ตามที่ต้องการ

## Stylesheet ที่รองรับ
**Rough** มี stylesheet หลากหลายรูปแบบมาให้ด้วยเมื่อทำการติดตั้ง โดยเราสามารถตรวจสอบรายการ stylesheet ที่มีโดยใช้คำสั่ง
```bash
$ bundle exec rougify help style
```

ผลลัพท์ที่ได้จะปรากฏดังแสดงด้านล่าง ซึ่งจะพบว่า **Rough** ได้เตรียม stylesheet ไว้ให้ใช้งานมากถึง 23 แบบ
```bash
...
available themes:
  base16, base16.dark, base16.light, base16.monokai, base16.monokai.dark, base16.monokai.light, base16.solarized,
  base16.solarized.dark, base16.solarized.light, bw, colorful, github, gruvbox, gruvbox.dark, gruvbox.light,
  igorpro, magritte, molokai, monokai, monokai.sublime, pastie, thankful_eyes, tulip
```
เราสามารถใช้คำสั่งสำหรับส่งออก stylesheet ที่จะใช้ โดยคำสั่ง
```bash
$ bundle exec rougify style base16.monokai.dark > styles.css
```

สำหรับขั้นตอนสุดท้ายก็คือการปรับแต่งเพิ่มเติมตามที่ชอบไม่ว่าจะเป็นฟ้อนต์ ขนาดตัวอักษร หรือสี แต่ถ้าไม่ต้องการปรับแต่งอะไรเพิ่มก็สามารถใช้ stylesheet ที่ export ออกมาได้เลย ดังที่ได้กล่าวข้างต้นแล้วว่าให้นำเข้า stylesheet ใส่เข้าไปใน `main.scss` ของโปรเจค จากนั้นดูผลลัพท์การแสดงผลในเว็บบราวเซอร์

![Before](/assets/images/posts/2019/syntax-hightlight-in-jekyll/before-add-stylesheet.png){:width="600px"}
*ก่อนเพิ่ม stylesheet*

![Before](/assets/images/posts/2019/syntax-hightlight-in-jekyll/after-add-stylesheet.png){:width="600px"}
*หลังเพิ่ม stylesheet*

## References
- [Rough](https://github.com/rouge-ruby/rouge)
- [Code Highlighting in Jekyll](https://jekyllrb.com/docs/liquid/tags/#code-snippet-highlighting)
