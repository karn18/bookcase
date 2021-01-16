---
layout: post
title: ลองสร้าง Audit Log ในรูปแบบ Rails Plugin
author: Karn
tags:
- rails
- plugin
- ruby
- audit
- log
categories: dev
cover: "/assets/images/posts/2021/create-audit-log-using-rails-plugin/cover.png"
image:
  path: "/assets/images/posts/2021/create-audit-log-using-rails-plugin/cover.png"
  width: 1200
  height: 630
date: 2021-01-16 18:50 +0700
---
โดยมากแล้วโปรแกรมที่พัฒนาด้วย **Rails** จะมี log เอาไว้เสมอ อย่างน้อยถ้าไม่ได้ log เพิ่มเข้าไปก็ต้องมี access log ที่บอกว่าผู้ใช้งานเข้าถึง route อะไรบ้าง ที่นี้เมื่อได้ log ข้อมูลลงไปมากขึ้นด้วยความที่ log ปกติของ **Rails** จัดเก็บอยู่ในรูปแบบของไฟล์ในเครื่อง เวลาที่จะตรวจสอบหรือค้นหาค่อนข้างจะยุ่งยาก<!--more-->

จึงได้ลองใช้ **Timber** 3rd Party Service ในการเก็บ log ดู ซึ่งเราสามารถเข้าไปดู log ได้แบบ real time วิธีการใช้งานก็ง่าย อีกทั้งการค้นหาสิ่งที่เราสนใจก็ทำได้ง่าย **แต่**ของฟรีและดีอย่างที่เราต้องการนั้นไม่มีอยู่จริง เพราะ **Timber** แบบฟรีนั้นให้เราเก็บ log ได้ขนาดจำกัด และ retention ในการดูข้อมูลย้อนหลังก็ทำได้เพียงแค่วันเดียวเท่านั้น

> อยากได้ของดี ก็ต้องเสียตังเอานะครับ

กลายเป็นว่าจะทำอย่างไรดีให้เราสามารถดู log ได้ง่ายขึ้น และตอบโจทย์ของเรา รวมถึงสามารถนำไปใช้งานในโปรเจ็คอื่นๆ ได้ด้วย ก็นึกขึ้นมาได้ว่าเราควรจะทำเป็น **Rails Plugin** เอาไว้ดีกว่า (กว่าจะเข้าเรื่องสักที)

Audit Log ที่พัฒนาขึ้นไว้ใช้งานนี้ก็จะเก็บข้อมูลด้วยคอนเซปต์ที่ว่า **ใคร ทำอะไร เมื่อไหร่** เริ่มต้นก็สร้าง plugin กันเลย ซึ่งเราสามารถศึกษาได้จาก[ที่นี่](https://guides.rubyonrails.org/plugins.html) โดยเจ้า plugin นี้สามารถเรียกใช้งานผ่าน global method ที่ชื่อ `with_audit` ดังตัวอย่างด้านล่าง

```ruby
with_audit("Bob", "login", "User is logged in to the system")
with_audit("System", ["sidekiq", "email"]) do
  "Sending alert email to administrator"
end
```

และนอกจากนี้การบันทึกข้อมูลลงในฐานข้อมูลจะมีด้วยกัน 2 โหมด คือ
1. async ซึ่งจะเรียกใช้งานผ่าน Active Job หรือบันทึกข้อมูลผ่าน Background Process
2. sync ซึ่งจะเรียกบันทึกข้อมูลทันที

> ใครสนใจพัฒนาต่อยอดก็สามารถ clone ได้จากด้านล่างนะครับ ส่วนถ้ามีฟีเจอร์ไรอัพเดตก็ PR กันเข้ามาได้ครับ 👇

## References
- [Rails Plugin](https://guides.rubyonrails.org/plugins.html)
- [Rails Generator](https://guides.rubyonrails.org/generators.html)
- [Latias Auditor](https://github.com/karn18/latias-auditor)
