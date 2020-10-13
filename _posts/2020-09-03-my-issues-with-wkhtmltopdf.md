---
layout: post
title: My Issues with WKHTMLTOPDF
author: Karn
tags:
- ruby
- wkhtmltopdf
categories: dev
cover: "/assets/images/posts/2020/my-issues-with-wkhtmltopdf/cover.png"
image:
  path: "/assets/images/posts/2020/my-issues-with-wkhtmltopdf/cover.png"
date: 2020-09-03 16:38 +0700
---
ไม่ว่าจะทำโปรเจ็คไหนก็ต้องพบกับปัญหาอยู่เสมอ ขึ้นอยู่ว่าจะเล็กหรือใหญ่ขนาดไหนแตกต่างกันไป สำหรับปัญหาที่จะถูกยกมาเล่าสู่กันฟังในวันบทความนี้ จะเป็นเรื่องเกี่ยวกับการสร้างเอกสารรายงานออกมาในรูป **PDF** ซึ่งผมก็จะใช้เครื่องมือที่ชื่อว่า **WKHTMLTOPDF**<!-- more -->

สำหรับเครื่องมือตัวนี้ เมื่ออ่านจากชื่อก็พอจะเดาออกว่าเป็นเป็นการแปลงไฟล์ **HTML** ให้ออกมาอยู่ในรูป **PDF** โดยปกติผมจะใช้เครื่องมือตัวนี้กับ **[wicked_pdf](https://github.com/mileszs/wicked_pdf)** แต่ก็ยังสามารถใช้ร่วมกับ **[PDFKit](https://github.com/pdfkitpdfkit)** ได้ด้วยเช่นกัน

## ฟ้อนต์ไทย

รายงานส่วนใหญ่ที่ผมต้องออกทั้งหมดในตอนนี้เป็นรายงานที่เป็นภาษาไทยทั้งหมด และแน่นอนว่า **WKHTMLTOPDF** ไม่ได้สนใจหรอกว่าผมจะใช้งานฟ้อนต์อะไร เพียงในกรณีที่กำหนดฟ้อนต์ใน **CSS** ให้ถูกต้อง เราก็จะได้รายงานที่แสดงข้อความเป็นภาษาต่างดาวบ้าง หรือเป็นกล่องสี่เหลี่ยมบ้าง ดังแสดงในรูปด้านล่าง

![ต่างดาว](/assets/images/posts/2020/my-issues-with-wkhtmltopdf/error1.png){:width="600px"}
*ภาษาต่างดาว*

![กล่องสี่เหลี่ยม](/assets/images/posts/2020/my-issues-with-wkhtmltopdf/error2.png){:width="600px"}
*กล่องสี่เหลี่ยม*

ที่รายงานของเราแสดงข้อความเป็นภาษาต่างดาวนั้นเกิดจากการที่เราไม่ได้กำหนดให้ **HTML** ของเรารองรับตัวอักษร **UTF-8** ดังนั้นเราจะต้องใส่ `<meta charset="utf-8" />` เข้าไปใน **header tag**

```erb
<head>
  <meta charset='utf-8' />
  <%= wicked_pdf_stylesheet_link_tag 'pdf' %>
</head>
```

และถ้าจะให้ **PDF** สามารถแสดงฟ้อนต์ไทยที่ถูกต้องเราสามารถทำได้ 2 แบบด้วยกันคือ

- **link tag** โดยปกติเราจะใส่ไว้ใน **layout** หลักที่ใช้แสดงรายงาน **PDF** 

### /app/views/layouts/pdf.pdf.erb

```html
<link href="https://fonts.googleapis.com/css2?family=Taviraj:wght@400;700&display=swap" rel="stylesheet">
```

- **@import** ซึ่งเราจะนำไปใส่ไว้ในส่วนบนสุดของ **SCSS** ที่จะถูกโหลดในการจัดการรายงาน

### /app/assets/stylesheets/pdf.scss

```scss
@import url('https://fonts.googleapis.com/css2?family=Taviraj:wght@400;700&display=swap');
```

จะสังเกตเห็นได้ว่าผมเลือกใช้งานฟ้อนต์ **Taviraj** ในการแสดงผล ที่นี่เรามาลองรันโปรแกรมเพื่อดูผลลัพท์กันว่าจะแสดงฟ้อนต์ตามที่ต้องการหรือไม่

![รายงานสมบูรณ์](/assets/images/posts/2020/my-issues-with-wkhtmltopdf/success.png){:width="600px"}
*แสดงฟ้อนต์ได้ถูกต้อง*

> รายงานของเราแสดงผลฟ้อนต์ภาษาไทยออกมาได้ถูกต้อง ไม่เป็นภาษาต่างดาว หรือกล่องสี่เหลี่ยมอีกต่อ

## References:
- [Wicked PDF](https://github.com/mileszs/wicked_pdf)
- [WKHTMLTOPDF](https://wkhtmltopdf.org)
