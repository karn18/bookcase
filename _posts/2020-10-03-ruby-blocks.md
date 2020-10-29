---
layout: post
title: เรียนรู้เกี่ยวกับ Ruby Blocks
author: Karn
tags:
  - ruby
  - 101
categories: dev
cover: "/assets/images/posts/2020/ruby-blocks/cover.png"
image:
  path: "/assets/images/posts/2020/ruby-blocks/cover.png"
  width: 1200
  height: 630
date: 2020-10-03 16:54 +0700
---
หากเริ่มเขียน **Ruby** มาได้สักระยะหนึ่ง จะพบว่ามี **syntax** ที่เห็นอยู่บ่อยๆ เลยก็คือ `{}` หรือคำสั่ง `do/end` โดยมีโค้ดอยู่ภายในดังตัวอย่างด้านล่าง ซึ่งจะเรียกว่า **Block**<!--more-->

```ruby
# Example 1
[1, 2, 3].each { |num| puts "Number is #{num}" }

# Example 2
[1, 2, 3].each do |num|
  puts "Number is #{num}"
end
```

> พารามิเตอร์ที่รับเข้ามาจะอยู่ภายในเครื่องหมาย | ในกรณีที่มีหลายพารามิเตอร์ก็จะใช้ , คั่น

จะพูดให้ง่ายๆ **Block** ก็คือ **Anonymous Function** ที่ถูกนิยามขึ้นโดยไม่มีฟังก์ชัน และถูกเรียกใช้งานในทันที ซึ่งจะใช้ `{}` หรือ `do/end` ก็ได้ แต่ส่วนใหญ่เราจะใช้ `{}` ในกรณีที่โค้ดเรามีเพียงบรรทัดเดียว และจะใช้ `do/end` เมื่อโค้ดมีหลายบรรทัด ทั้งนี้ก็เพื่อความสวยงาม และอ่านได้ง่าย

# References:
- [http://marcuscode.com/lang/ruby/variables-and-variable-scope](http://marcuscode.com/lang/ruby/variables-and-variable-scope)
- [https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/](https://www.rubyguides.com/2016/02/ruby-procs-and-lambdas/)
