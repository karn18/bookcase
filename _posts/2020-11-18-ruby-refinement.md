---
layout: post
title: Ruby Refinement
author: Karn
tags:
- ruby
- 101
categories: dev
cover: "/assets/images/posts/2020/ruby-refinement/cover.png"
image:
  path: "/assets/images/posts/2020/ruby-refinement/cover.png"
  width: 1200
  height: 630
date: 2020-11-18 22:42 +0700
---
เป็นที่รู้กันดีว่า **Ruby** ถูกออกมาแบบมาด้วยหลักการ **Open/Closed** ซึ่งก็ทำให้เราสามารถที่จะทำ **Monkey Patching** ให้กับคลาสหรือโมดูลได้ง่ายดาย แต่อย่างไรก็ตาม **Monkey Patching** ก็เป็นดาบสองคม<!--more--> เพราะการ patch จะส่งผลต่อทุกๆ instance ของคลาส ซึ่งถ้าเป็นการเพิ่มเมธอดใหม่ก็ดูจะไม่กระทบอะไรเท่าไหร่ แต่ถ้าเป็นการ override เมธอดเดิมที่มีอยู่ ก็จะทำให้เกิดบั๊คกับโค้ดเราได้

## message.rb
```ruby
class Message
  def initailize(message)
    @message = message
  end

  def print
    puts @message
  end
end
```

## patched_message.rb (Monkey Patching)
```ruby
class Message
  def print
    puts "[Patched]: #{@message}"
  end
end
```

## app.rb (Before Patch)
```ruby
require_relative './message'

msg = Message.new "Great Day"
msg.print # --> Great Day
msg = Message.new('Awesome Day')
msg.print # --> Awesome Day
```

## app.rb (After Patch)
```ruby
require_relative './message'
require_relative './patched_message'

msg = Message.new "Great Day" 
msg.print # --> [Patched]: Great Day
msg = Message.new('Awesome Day')
msg.print # --> [Patched]: Awesome Day
```

> ทันที่ที่เรียก Monkey Patching การแสดงผลของทุกๆ instance ก็จะเปลี่ยนไปเมื่อเรียกใช้ print

ที่นี้แหละ **Refinement** จึงได้กลายมาเป็นพระเอก ที่จะเข้ามาแก้ไขปัญหาข้างต้น โดย **Refinement** จะคล้ายๆ กับ **Moneky Patching** แต่จะส่งผลกระทบกับโค้ดที่มีเรียกใช้งานเท่านั้น หรืออยู่ภายใต้ scope ที่เราต้องการนั้นเอง

## refined_message.rb
```ruby
module RefinedMessage
  refine Message do
    def print
      puts "[Refined]: #{@message}"
    end
  end
end
```
> การนิยาม refinement ให้กับคลาสใดๆ จะต้องอยู่ภายใต้โมดูล

## app.rb (Using Refinement)
```ruby
require_relative './message'
require_relative './refinement_message.rb'

msg = Message.new('Great Day')
msg.print # --> Great Day

using RefinedMessage
msg = Message.new('Awesome Day')
msg.print # --> [Patched]: Awesome Day
```

> การใช้งาน refinement ก็จะใช้ `using` ตามด้วยโมดูลที่เราได้นิยาม refinement เอาไว้

สำหรับการใช้ **Refinement** ก็ประมาณนี้ก็จะช่วยให้เราเพิ่มความสามารถให้กับคลาสเดิมของเราได้ โดยที่ไม่ส่งผลกระทบกับโค้ดเดิมที่เราใช้งานอยู่

## References
- [Refinement](https://docs.ruby-lang.org/en/2.4.0/syntax/refinements_rdoc.html)
- [ruby-refinement](https://rollout.io/blog/ruby-refinements/)
