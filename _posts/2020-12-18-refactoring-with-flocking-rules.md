---
layout: post
title: Refactoring with Flocking Rules
author: Karn
tags:
- refactoring
- ruby
categories: dev
cover: "/assets/images/posts/2020/flocking-rules/cover.png"
image:
  path: "/assets/images/posts/2020/flocking-rules/cover.png"
  width: 1200
  height: 630
date: 2020-12-18 12:23 +0700
---
ได้อ่านหนังสือ [99 Bottles](https://sandimetz.com/99bottles) ของ **Sandi Metz** แล้วก็เจอวิธีการ refactor ด้วยใช้เทคนิค **Flocking Rules** ก็เลยหยิบยกมาเล่าให้ฟัง

ก่อนอื่นมาดูนิยามกันก่อนโดยคำว่า Flocking มาจากพฤติกรรมของสัตว์ที่อยู่เป็นกลุ่ม อย่างเช่นนก แมลง หรือปลา เมื่อฝูงจะต้องการทำการเลี้ยว หรือเปลี่ยนทิศทาง จะมีผู้นำกลุ่มไม่กี่ตัวจะแยกตัวขึ้นนำ และค่อยๆ เปลี่ยนทิศทาง จากนั้นกลุ่มตามหลังก็จะสามารถตามไปได้ถูกต้อง
ด้วยพฤติกรรมข้างต้น จึงถูกนำมาใช้ในการ refactor ด้วย โดยเราจะค่อยๆ แก้ไขโค้ดไปทีละนิด เพื่อให้มั่นใจว่าการเปลี่ยนแปลงที่เกิดขึ้นไม่ทำให้โค้ดของเราที่เหลือพังนั้นเอง

---

> เมื่อเราอยู่กันเปลี่ยนกลุ่ม การเปลี่ยนแปลงทีละนิด จะส่งผลกระทบต่อทั้งกลุ่ม

สำหรับหลักการของ Flocking Rules ก็มีด้วยกัน 3 ข้อ
1. ลองมองหาโค้ดที่เหมือนกัน หรือถ้าจะพูดให้ง่ายๆ ก็คือที่เราใช้วิธีการ copy/paste มานั้นเอง
2. หาส่วนเล็กๆ ที่แตกต่างออกไปจากโค้ดส่วนใหญ่
3. เปลี่ยนแปลงแก้ไขโค้ด เพื่อเอาส่วนที่แตกต่างนั้นออก

อ่านๆ ไปคงยังไม่เห็นภาพเท่าไหร่ ลองดูจากโค้ดด้านล่างแล้วกันและทำตามกฏไปด้วยกัน

```ruby
case number 
when 0..2
...
when 3
  "3 bottles of beer on the wall, " \
  "3 bottles of beer.\n" \
  "Take one down and pass it around, " \
  "2 bottle of beer on the wall.\n"
when 4
  "4 bottles of beer on the wall, " \
  "4 bottles of beer.\n" \
  "Take one down and pass it around, " \
  "3 bottle of beer on the wall.\n"
when 5
  "5 bottles of beer on the wall, " \
  "5 bottles of beer.\n" \
  "Take one down and pass it around, " \
  "4 bottle of beer on the wall.\n"
end
```

ลองไล่ดูตามกฏข้างต้น และพิจารณา จากนั้นเอาจะได้โค้ดที่ refactor แล้วเป็นดังนี้

```ruby
case number
when 0..2
...
else 
  "#{number} bottles of beer on the wall, " \
  "#{number} bottles of beer.\n" \
  "Take one down and pass it around, " \
  "#{number - 1} bottle of beer on the wall.\n"
end
```

จากนั้นเราก็ค่อยทำไปเรื่อยๆ จนกว่าโค้ดเราจะดูง่าย อ่านง่ายขึ้น อันนี้เป็นเพียงแค่เทคนิคหนึ่งเท่านั้น จะต้องมีการนำเทคนิคๆ อื่นมาใช้คู่กันไปด้วยนะ หวังว่าคงสนุกกับการ refactor

## References
- [99 Bottles](https://sandimetz.com/99bottles)
