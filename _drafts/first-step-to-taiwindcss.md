---
layout: post
title: ก้าวย่างสู่ Taiwind CSS
author: Karn
tags:
- ruby
- rails
- css
- tailwind
categories: dev
cover: "/assets/images/posts/2021/colorizing-text-in-ruby/cover.png"
image:
  path: "/assets/images/posts/2021/colorizing-text-in-ruby/cover.png"
  width: 1200
  height: 630
---

ต้องยอมรับก่อนเลยว่า **Tailwind CSS** เป็นอีกหนึ่ง **CSS Framework** ที่มีการพูดถึงมากขึ้น ด้วยความเป็นเอกลักษณ์ของการออกแบบพัฒนาที่แบ่ง class name ออกเป็น utility ชิ้นเล็กๆ คล้ายกับ LEGO แล้วเอามาประกอบรวมกันให้กลายเป็นคอมโพเนนต์ที่สวยงามตามต้องการ ทำให้ผู้พัฒนาที่ใช้ **Tailwind CSS** รู้สึกมีความยืดหยุ่นในการใช้งานมากกว่า framework อื่นๆ แต่กระนั้นก็มี learning curve ที่ถือว่าสูงพอสมควรสำหรับผู้เริ่มต้น เพราะผู้ใช้งานจะต้องมองภาพให้ออกว่าในเว็บของเรามีองค์ประกอบอะไรบ้าง รวมถึงไม่มีคอมโพเนนต์สำเร็จรูปเหมือนคนอื่นเค้า อยากได้อะไรก็ต้องประกอบขึ้นมาเอง<!--more-->

อันที่จริงตอนแรกที่รู้สึกไม่ค่อยชอบ **Taiwind CSS** ก็เพราะเรื่องดังกล่าวข้างต้น มิหนำซ้ำเราจะเห็น class name ต่อๆ กัน ยาวเป็นพรืดอีกด้วย และจากการที่ตัวเองไม่ค่อยแข็งแรงมากนักเกี่ยวกับการใช้ **CSS** ยิ่งไปกันใหญ่เลย แต่ไหนๆ ก็มาถึงตรงนี้แล้ว ลองเปิดใจและศึกษาดูสักตั้งจะเป็นไรไป โดยประจวบเหมาะที่ [@dhh](https://twitter.com/dhh) ได้ปล่อย [tailwind-rails](https://github.com/rails/tailwindcss-rails) ออกมาพอดี ก็ถือโอกาสลองเลยละกัน

## tailwindcss-rails

สำหรับ **gem** ตัวนี้ถูกพัฒนาขึ้นมาเพื่อรองรับการจัดการกับ CSS 2 แบบด้วยกัน คือ

1. Assets Pipeline หรือ Sprocket

    - ทำการติดตั้งผ่านคำสั่ง `rails tailwindcss:install:assets_pipeline`
    - ให้ใส่ `stylesheet_link_tag "tailwind"` และ `stylesheet_link_tag "inter-font"` เข้าไปยังไฟล์ `app/views/application.html.erb`
    - จากนั้นเราก็ใส่ css ตามปกติในโฟลเดอร์ `app/assets/stylesheets`

2. Webpacker

    - ทำการติดตั้งผ่านคำสั่ง `rails tailwindcss:install:webpacker`
    - ให้เปลี่ยน `stylesheet_link_tag "application"` เป็น `stylesheet_pack_tag "application"` ในไฟล์ `app/views/application.html.erb` แทน
    - สร้างไฟล์ `application.css` ในโฟลเดอร์ `app/javascripts/stylesheets`
    - เพิ่ม `import 'stylesheets/application'` เข้าไปใน `app/javascripts/packs/application.js`

จากขั้นตอนข้างต้นเราก็สามารถใช้งาน utility class ของ tailwind ได้แล้วใน html ของเรา เพียงแต่ในแต่ละวิธีก็มีข้อดีข้อเสียของมันอยู่เล็กๆ น้อยๆ ซึ่งก็ขึ้นอยู่ว่าใครจะเลือกใช้วิธีไหน

สำหรับโดยส่วนตัวนั้นจะชอบใช้ assets pipeline ในการจัดการ CSS มากกว่า เพราะมันดูตรงไปตรงมา แต่ถ้าเลือกวิธีการนี้เราจะอดใช้ความสามารถ **directive** ของ tailwind ไปเลย นั้นเลยกลายเป็นว่าจะได้ศึกษาวิธีการใช้งาน tailwind ก็มาจบที่จะทำยังไงให้สามารถใช้ **directive** ของ tailwind กับ assets pipeline ไปซะงั้น

จากที่ได้งมๆ อยู่ก็พอจะหา workaround มาช่วยได้ โดยจะเล่าเป็นแนวทางในการพัฒนาดังต่อไปนี้
- สร้าง wrapper class ที่เรียกใช้ compiler ที่รองรับ directive ของ tailwind ซึ่งก็จะใช้ **tailwind-cli**
- สร้างโฟลเดอร์สำหรับ stylesheets ของเรา แต่อันนี้ต้องอยู่นอก `app/assets/stylesheets` เพราะเราจะมีการ compile อีกรอบหนึ่งก่อน
- 

## References
- [TaiwindCSS](https://tailwindcss.com/)
