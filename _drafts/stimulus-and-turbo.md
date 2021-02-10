---
layout: post
title: Stimulus and Turbo
author: Karn
tags:
- ruby
- rails
- turbo
categories: dev
cover: "/assets/images/posts/2020/html-over-with-turbo/cover.png"
image:
  path: "/assets/images/posts/2020/html-over-with-turbo/cover.png"
  width: 1200
  height: 630
---

จากบทความเรื่อง **Turbo** 👉 [ลิงค์]({% post_url 2020-12-28-html-over-with-turbo %}) และตัวอย่างการใช้งาน **CustomEvent** 👉 [ลิงค์]({% post_url 2021-02-05-use-customevent-to-communicate-between-stimulus-controllers %}) ทำให้เกิดความคิดว่าน่าจะลองนำ **Turbo** มาใช้ในการแสดงเนื้อหาก็น่าจะได้นะ<!--more-->

สำหรับตัวอย่างการใช้งาน **CustomEvent** ในบทความที่แล้ว จะเป็นการสร้างเหตุการณ์ส่งผ่านจาก controller หนึ่ง ไปยังอีก controller อีกตัวหนึ่งในระนาบเดียวกัน เพื่อทำให้รับทราบได้ว่าเกิดเหตุการณ์อะไรขึ้น และ controller ที่รับจะทำอะไรต่อไป ทั้งนี้สำหรับผมแล้วขอแบ่งการสื่อสารระหว่าง controller ออกเป็น 2 แบบด้วยกัน คือ

1. การสื่อสารในแนวราบ หรือการสื่อสารระหว่าง controller กับ controller ที่อยู่ข้างๆ กันหรือระนาบเดียวกัน

    ![Side by Side](/assets/images/posts/2021/stimulus-and-turbo/side_by_side.png){:width="600px"}

    > สำหรับการสื่อสารระหว่าง controller ในรูปแบบนี้ ผมก็จะเลือกใช้ CustomEvent ส่งระหว่าง controller A ไปยัง controller B หรือจาก controller B กลับไปยัง controller A

2. การสื่อสารในแนวตั้ง หรือการสื่อสารระหว่าง controller แม่ กับ controller ลูก

  ![Side by Side](/assets/images/posts/2021/stimulus-and-turbo/inheritance.png){:width="300px"}



ถ้าเราลองนำความสามารถของ **Turbo** มาใช้เมื่อลองนำ **Turbo** มาใช้กับตัวอย่างนี้ก็จะทำให้อะไรๆ ง่ายขึ้น
