---
layout: post
title: งงๆ กับ Methods และ Instance Methods ใน Ruby
author: Karn
tags:
- ruby
- 101
categories: dev
cover: "/assets/images/posts/2020/methods-vs-instance-methods/cover.png"
image:
  path: "/assets/images/posts/2020/methods-vs-instance-methods/cover.png"
  width: 1200
  height: 630
date: 2020-10-22 12:07 +0700
---
```ruby
class Car
  def forward
   @distance = 1
  end
end
```
จาก **Class** ด้านบน ถ้ามีคนมาถามเราว่าคลาส **Car** มี methods อะไรบ้าง คำตอบก็คือมี method ที่ชื่อ `forward` ไงหละ ถูกต้องแล้วครับ<!-- more --> 

```bash
c = Car.new
Car.methods == c.methods           # false
Car.instance_methods == c.methods  # true
```

ที่นี้ลองดูโค้ดเปรียบเทียบ methods ที่อยู่ภายใต้ **Instance** และ **Class** กัน สังเกตเห็นอะไรมั้ยครับ

- **c** เป็น object ที่สร้างขึ้นจาก class **Car**
- methods ของ class **Car** ไม่เท่ากับ methods ของ object **c**
- instance methods ของ class **Car** กับเท่ากันกับ methods ของ object **c**

ไม่รู้จะงงมากขึ้นกว่าเดิมหรือเปล่า เพียงแต่สิ่งที่โค้ดพยายามจะบอกเราก็คือ
- เมื่ออ้างอิงจาก object เราจะเรียกมันว่า **methods**
- เมื่ออ้างอิงจาก class มันจะมี **methods** ด้วยกัน 2 ประเภทคือ **Instance methods** และ **Class methods** 
  - ถ้าจะบอกว่าภายใน class **Car** มี methods อะไรบ้าง อันนั้นจะหมายถึง **Class methods** ซึ่ง method `forward` ไม่ใช่ **Class methods**
  - ส่วนถ้าจะบอกว่าใน class **Car** มี **Instance methods** อะไรบ้าง สามารถตอบทันทีเลยว่า `forward` เป็นหนึ่งในนั้น

## References
- [Metaprogramming Ruby 2](https://pragprog.com/titles/ppmetr2/metaprogramming-ruby-2)
