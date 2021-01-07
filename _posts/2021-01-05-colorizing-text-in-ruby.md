---
layout: post
title: เติมแต่งสีสันให้กับข้อความใน Ruby
author: Karn
tags:
- ruby
- gem
categories: dev
cover: "/assets/images/posts/2021/colorizing-text-in-ruby/cover.png"
image:
  path: "/assets/images/posts/2021/colorizing-text-in-ruby/cover.png"
  width: 1200
  height: 630
date: 2021-01-05 14:57 +0700
---
เริ่มต้นปี 2564 กันด้วยบทความเบาๆ ก่อนแล้วกัน โดยวันนี้จะมาพูดถึงการเติมแต่งสีสันให้กับข้อความที่เราพ่นออกทาง terminal หรือ console ซึ่งการเพิ่มสีสันให้กับข้อความก็อาจจะทำให้เรามองเห็นได้ง่ายขึ้น หรือสนุกกับการอ่าน log ก็เป็นได้<!--more-->

วิธีการที่จะเพิ่มสีสันให้กับข้อความก็ง่ายๆ เพียงใช้ Gem ซึ่งจะแนะนำด้วยกัน 2 ตัว คือ `Colorize gem` และ `Rainbow gem` โดยทั้งสองตัวมีความสามารถที่คล้ายคลึงกัน แต่ถ้าดูในเรื่องการอัพเดตก็คงต้องเลือก `Rainbow` เพราะ `Colorize` นั้นดูแล้วไม่ได้รับการอัพเตดมามากว่า 2 ปีแล้ว

## Rainbow

สำหรับวิธีการใช้งาน Rainbow นั้นสามารถทำได้ 2 วิธี คือ

1. เรียกผ่าน Presentation Object

    ```ruby
    require "rainbow"

    puts Rainbow("Hello World").green.underline
    ```


2. ใช้ Refinement เพื่อเพิ่มความสามารถให้กับ String

    ```ruby
    require "rainbow/refinement"
    using Rainbow

    puts "Hello World".blue.underline
    ```

จากโค้ดข้างต้นจะให้ผลลัพท์เหมือนกันดังแสดงในรูปด้านล่าง

![rainbow_1](/assets/images/posts/2021/colorizing-text-in-ruby/rainbow_1.png){:width="500px"}
*Colorizing 1*

นอกจากสีที่เป็น ANSI แล้ว เรายังสามารถใช้สีที่เป็น RGB ได้ด้วย ไม่ว่าจะใช้เป็น Hex String หรือ Decimal

```ruby
puts Rainbow("Blue Green Color").color("15b5b0") # .color(21, 181, 176) 
```

![rainbow_2](/assets/images/posts/2021/colorizing-text-in-ruby/rainbow_2.png){:width="500px"}
*Colorizing 2*

เพิ่มความ advance ให้กับการแสดงผลอีกหน่อย โดยการแสดงข้อความแบบไล่สี

```ruby
colors = ['009292', 'f65156', '88070b', 'ffce13'] # Color from https://www.canva.com/colors/color-palettes/fluorescent-fruit/
i = -1
puts "What a Wonderful World".chars.map { |char| i += 1; Rainbow(char).color(colors[i % colors.size]) }.join
```

![rainbow_2](/assets/images/posts/2021/colorizing-text-in-ruby/rainbow_3.png){:width="500px"}
*Colorizing 3*

## References
- [Rainbow gem](https://github.com/sickill/rainbow)
- [Colorize gem](https://github.com/fazibear/colorize)
