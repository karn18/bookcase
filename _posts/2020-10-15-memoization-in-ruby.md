---
layout: post
title: Memoization in Ruby
author: Karn
tags:
  - ruby
  - 101
categories: dev
cover: "/assets/images/posts/2020/memoization-in-ruby/cover.png"
image:
  path: "/assets/images/posts/2020/memoization-in-ruby/cover.png"
  width: 1200
  height: 630
date: 2020-10-15 22:22 +0700
---
อีกหนึ่งเทคนิคที่มักพบเห็น และนำมาใช้กันในภาษา **Ruby** ก็คือ **Memoization** แต่ถ้าดูจากชื่อก็น่าจะงงๆ กันบ้างว่าเป็นมันคืออะไร แต่เชื่อผมเถอะว่าในโค้ดของคุณไม่มากก็น้อย ต้องเคยมีการใช้เทคนิคดังกล่าวแน่ๆ เพียงแค่คุณไม่รู้จักชื่อเท่านั้น ซึ่งเทคนิค **Memoization** จะช่วยเพิ่มความเร็วในการทำงานให้กับโปรแกรมของคุณไม่น้อยเลยทีเดียว<!-- more -->

## Memoization คืออะไร

> Memoization is the process of storing a computed value to avoid duplicated work by future calls.

ถ้าแบ่งเป็นขั้นตอนจะมีด้วยกัน 3 ขั้นด้วยกันคือ
- โค้ดถูกเรียกใช้งาน เพื่อประมวลผลอะไรบางอย่าง
- แทนที่จะส่งค่าคืนกลับไปเมื่อถูกเรียกเพียงอย่างเดียว จะเก็บค่าที่ได้จากการประมวลผลเอาไว้ในตัวแปร
- เมื่อมีการเรียกใช้งานโค้ดดังกล่าวอีกครั้ง ก็จะดึงค่าที่เก็บเอาไว้ส่งคืนกลับไป โดยไม่ต้องประมวลผลใหม่

ถ้าอ่านคำอธิบายข้างต้นแล้วยังงง มาดูรายละเอียดพร้อมกับโค้ดตัวอย่างกันเลยดีกว่า น่าจะทำให้เข้าได้ดียิ่งขึ้น
- ก่อนอื่นลงสังเกต โค้ดด้านล่าง จะเห็นว่ามีการเรียกใช้ `user_score` ซึ่งจะทำการดึงข้อมูลคะแนนของผู้ใช้งานจากฐานข้อมูล

```ruby
def user_score
  User.find_by(name: 'Sam').try(:score)
end
```

- เมื่อ `user_score` ถูกเรียกใช้ ไม่ว่าจะกี่ครั้งสิ่งที่เกิดขึ้นคือจะต้องไปดึงข้อมูลจากฐานข้อมูลทุกรอบ ซึ่งก็เป็นกระบวนการที่เสียเวลา ให้เปลืองทรัพยากร
- จุดที่ **Memoization** ถูกนำมาใช้ก็คือตรงนี้เองแหละครับ แทนที่เราจะต้องดึงข้อมูลจากฐานข้อมูลทุกรอบ เราก็จะเก็บข้อมูลที่เคยดึงเก็บเอาไว้ในตัวแปรหนึ่งตัว ซึ่งนั้นก็คือ `@user_score` ดังแสดงในโค้ดด้านล่าง

> Memoization มักจะใช้เครื่องหมาย `||=`

```ruby
def user_score
  @user_score ||= User.find_by(name: 'Sam').try(:score)
end
```

> พูดง่ายๆ Memoization ก็เป็นการ Caching ข้อมูลนั้นเอง

## References
- [https://en.wikipedia.org/wiki/Memoization](https://en.wikipedia.org/wiki/Memoization)
- [http://gavinmiller.io/2013/basics-of-ruby-memoization](http://gavinmiller.io/2013/basics-of-ruby-memoization)
- [https://rubyinrails.com/2014/11/03/memoization-ruby](https://rubyinrails.com/2014/11/03/memoization-ruby/)
