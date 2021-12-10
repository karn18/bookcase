---
layout: post
title: Keyword Argument ใน Ruby 3
description: มาดูว่าอะไรที่เปลี่ยนแปลงไปในการใช้ keyword argument ใน Ruby เวอร์ชัน
  3 และมีผลกระทบกับโค้ดของเราอย่างไร
author: Karn
tags:
- ruby
- keyword-argument
categories: dev
cover: "/assets/images/posts/2021/keyword-argument-in-ruby-3/cover.png"
image:
  path: "/assets/images/posts/2021/keyword-argument-in-ruby-3/cover.png"
  width: 1200
  height: 800
date: 2021-12-09 17:51 +0700
---
ไม่ว่าจะใช้ภาษาอะไรในการพัฒนาโปรแกรม เมื่อมีอัพเดตเวอร์ชันที่เป็นเมเจอร์เกิดขึ้นใหม่ จะมีการเปลี่ยนแปลงที่ส่งผลกระทบต่อโค้ดเก่าไม่มากก็น้อย ซึ่งในส่วนของ Ruby เวอร์ชัน 3 ก็เช่นกัน โดยในบทความนี้จะกล่าวถึงผลกระทบที่เกิดขึ้นกับการใช้งาน keyword argument เพราะผมเพิ่งจะโดนเข้าไปเนื่องจากการไมเกรตโปรเจ็คจาก Ruby เวอร์ชัน 2 ไปเป็นเวอร์ชัน 3 นั้นเอง

ก่อนอื่นต้องทำความเข้าใจกันก่อนว่าใน Ruby 2 เราจะใช้ keyword argument กันอย่างไร

```ruby
## Ruby 2.7
def foo(name: "default")
  puts name
end
# foo -> "default"
# foo("karn") -> "karn"

def foo(kwargs = {})
  puts kwargs
end
# foo -> {}
# foo(name: "karn", value: 3) -> {:name=>"karn", :value=>3}
# foo({ name: "karn", value: 3 }) -> {:name=>"karn", :value=>3}

def foo(**kwargs)
  puts kwargs
end
# foo -> {}
# foo(name: "karn", value: 3) -> {:name=>"karn", :value=>3}
```

โดยรูปแบบของการใช้งาน keyword argument จะเป็นดังตัวอย่างโค้ดข้างต้นคือ 
1. นิยามโดยใช้ keyword แบบตรงไปตรงมา ซึ่งเราสามารถกำหนดเป็น required หรือ optional ก็ได้
2. นิยามผ่าน hash โดยใน Ruby 2 จะมอง Hash ที่ถูกส่งมาเป็น keyword argument
3. นิยามโดยใช้ ** (double splat)


ใน Ruby 3 รูปแบบของ keyword argument จะถูกแยกออกจาก postional argument จึงทำให้เหลือ 2 รูปแบบในการเรียกใช้งาน keyword argument ซึ่งก็คือ `def foo(name: "default"); end` และ `def foo(**kwargs); end` ส่วนการเรียกใช้งาน `def foo(kwargs = {})` ซึ่งรับค่าเป็น Hash จะไม่มองว่าเป็น keyword argument อีกต่อไป และโค้ดที่เราใช้อยู่ใน Ruby 2 ก็ยังคงทำงานได้ปกติใน Ruby 3

**แต่**โค้ดที่จะพังทันทีก็คือโค้ดที่มีการเรียกใช้งาน `def foo(**kwargs); end` พร้อมส่งผ่านพารามิเตอร์ที่เป็น Hash เข้าไป โดยจะฟ้องข้อผิดพลาดที่ชื่อ `ArgumentError` ขึ้นมา

```ruby
## Ruby 3
def foo(**kwargs)
  puts kwargs
end

foo({ name: "karn", value: 3 }) -> foo': wrong number of arguments (given 2, expected 1) (ArgumentError)
```

แน่นอนว่าโปรเจ็คของทีมมีการนิยามเมธอดที่เป็น keyword argument ดังโค้ดข้างต้น ดังนั้นเมื่อมีการอัพเดตไปใช้ Ruby เวอร์ชัน 3 เราต้องรีบมาทางแก้ไขปัญหาดังกล่าว ซึ่งสามารถทำได้ 2 วิธีในการเรียกใช้เมธอดคือ

1. ใส่ `**` (double splat) ไว้ด้านหน้า `{ }`


    ```ruby
    foo(**{ name: "karn", value: 3 })
    ```

2. ถอดเอา `{ }` ออก

  ```ruby
  foo(name: "karn", value: 3)
  ```

เรียบร้อยเพียงเท่านี้เราก็แก้ปัญหาเรื่อง keyword argument ใน Ruby 3 ได้

## References
- [Separation of positional and keyword arguments in ruby 3.0](https://www.ruby-lang.org/en/news/2019/12/12/separation-of-positional-and-keyword-arguments-in-ruby-3-0/)