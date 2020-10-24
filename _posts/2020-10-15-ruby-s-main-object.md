---
layout: post
title: Ruby's Main Object
author: "Karn"
tags:
  - ruby
  - 101
categories: dev
cover: "/assets/images/posts/2020/ruby-s-main-object/cover.png"
image:
  path: "/assets/images/posts/2020/ruby-s-main-object/cover.png"
  width: 1200
  height: 630
date: 2020-10-15 14:22 +0700
---
**Ruby** ถูกออกแบบขึ้นมาภายใต้หลักการของ **Object** นั้นทำให้ทุกสิ่งทุกอย่างที่อยู่ภายใต้การทำงาน **Ruby** ล้วนเป็น **Object** ทั้งหมด โดย **Object** ที่เป็น **Top Level** จะเรียกว่า **Main Object** ซึ่งเมธอดที่ถูกนิยามภายใต้ **Main Object** สามารถที่จะถูกเรียกจากที่ไหนก็ได้ ยกตัวอย่างเช่นการที่เราเรียกใช้เมธอด `puts`, `respond_to?` หรือ `is_a?` ได้ทุกๆ ที่<!-- more -->

จริงๆ แล้ว **Main Object** จะถูกสร้างเป็น instance หนึงขึ้นมาเมื่อโปรแกรมรันหรือเปิด **IRB**

![main object](/assets/images/posts/2020/ruby-s-main-object/main_object.png){:width="300px"}
*Main Object ใน IRB*

เราสามารถนิยามเมธอดที่สามารถเรียกใช้งานได้จากทุกๆ ที่ได้ง่ายๆ เพียงแค่นิยามเมธอดไว้ด้านนอกคลาส หรือโมดูลเท่านั้น **Ruby** จะก็จะผูกเมธอดนั้นๆ เข้ากับ **Main Object** ให้เราโดยอัตโนมัติ

ลองนิยามเมธอด `show_message` มาทดสอบกัน

![main object](/assets/images/posts/2020/ruby-s-main-object/irb_define_method.png){:width="600px"}
*show_message in irb*

> สิ่งหนึ่งที่มีความแตกต่างกันระหว่างการนิยามเมธอดใน **IRB** กับในไฟล์ **Ruby** ก็คือ **IRB** จะผูกเมธอดที่นิยามในขอบเขตที่เป็น **public** แต่ในไฟล์จะถูกผูกในขอบเขตที่เป็น **private** อันนี้ต้องไปลองเล่นดูได้นะครับ จะได้เห็นความแตกต่าง

## References
- [https://engineering.appfolio.com/appfolio-engineering/2018/8/9/rubys-main-object-does-what](https://engineering.appfolio.com/appfolio-engineering/2018/8/9/rubys-main-object-does-what)
- [https://codequizzes.wordpress.com/2014/04/23/rubys-main-object-top-level-context/](https://codequizzes.wordpress.com/2014/04/23/rubys-main-object-top-level-context/)
