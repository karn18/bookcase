---
layout: post
title: Ruby's Main Object
---

**Ruby** ถูกออกแบบขึ้นมาภายใต้หลักการของ **Object** นั้นทำให้ทุกสิ่งทุกอย่างที่อยู่ภายใต้การทำงาน **Ruby** ล้วนเป็น **Object** ทั้งหมด และ **Object** ที่เป็น **Top Level** จะเรียกว่า **Main Object** 

**Main Object** จะเป็น instance ของคลาส **Object** ซึ่งเราสามารถทดสอบได้ง่ายๆ เพียงแค่เปิด **IRB** ขึ้นมา

```ruby
puts self # main
puts self.class # Object
puts self.object_id # 180
```

สำหรับเมธอดที่ถูกนิยามอยู่นอกคลาส หรือโมดูลก็จะถูกจัดให้อยู่ภายใต้ **Main Object** เช่นกัน 

```ruby
def show_message(msg)
  puts "Message is #{msg}"
end

puts self.private_methods.include?(:show_message)
```

สิ่งที่แตกต่างกันระหว่าง **IRB** และการรันผ่าน **Ruby** ก็คือ
- **IRB** จะผูกเมธอดที่นิยามใน **main** เข้ากับขอบเขตที่เป็น **public** 
- **Ruby** จะผูกเมธอดที่นิยามใน **main** เข้ากับขอบเขตที่เป็น **private**