---
layout: post
title: ใช้งาน Bulma ใน Rails
date: 2019-12-03 09:00:00 +0700
author: "Karn"
tags:
  - rails
  - bulma
categories: dev
cover: '/assets/images/posts/2019/using-bulma-with-rails/cover.png'
image:
  path: '/assets/images/posts/2019/using-bulma-with-rails/cover.png'
  height: 100
  width: 100
---

ถ้าจะกล่าวถึง CSS Framework ที่เป็นที่นิยมใช้กันนั้นก็มีอยู่ด้วยกันหลากหลาย สำหรับในบทความนี้จะกล่าวถึง **Bulma** ซึ่งเป็น CSS Framework ที่ใช้งานได้ง่าย ไม่ซับซ้อนและแลดูสวยงามเมื่อแสดงผลอยู่บนเว็บบราวเซอร์ โดยในวันนี้เราจะนำ **Bulma** มาใช้งานร่วมกันกับ **Rails**

<!--more-->

## ความต้องการพื้นฐาน
- Ruby 2.6
- Rails 6.0

-----

## เริ่มต้นอย่างรวดเร็ว
ก่อนอื่นเรามาสร้างโปรเจค *Rails* กันก่อน

```bash
$ rails new myapp
```

สำหรับการติดตั้ง Bulma ให้กับโปรเจคสามารถทำได้ 2 วิธี คือ
- ติดตั้งแบบ manual โดยวิธีนี้จะต้องใช้ NodeJS ร่วมด้วย
- ติดตั้งโดยใช้ Gem

ในบทความนี้จะเลือกใช้วิธีที่ 2 นั้นคือติดตั้งโดยใช้ Gem ซึ่งทำได้ง่ายกว่า และพร้อมใช้กับ Rails ในทันที ด้วยวิธีการเพิ่มคำสั่งติดตั้งเข้าไปในไฟล์ **Gemfile** ที่อยู่ภายในโปรเจค สำหรับ Gem ที่ใช้งานมีชื่อว่า
**[bulma-rails](https://github.com/joshuajansen/bulma-rails)**

```ruby
gem "bulma-rails", "~> 0.8.0"
```

รันคำสั่งเพื่อติดตั้ง

```bash
$ bundle install
```

จากนั้นนำเข้าสไตล์ของ **Bulma** เข้าไปยัง **application.scss**

![applicaiton.scss](/assets/images/posts/2019/using-bulma-with-rails/application-scss-path.png){:width="200px"}
*ตำแหน่งที่ตั้งของไฟล์ application.scss*

*!!! หมายเหตุ: ในกรณีที่ extension ของ application เป็น css อยู่ให้ทำการเปลี่ยน extension ให้เป็น scss ด้วยการ rename*


```scss
@import "bulma";
```

มาถึงตรงนี้โปรเจคของเราก็พร้อมที่จะใช้ **Bulma** ดังนั้นเรามาลองสร้างหน้าเว็บที่ใช้งาน **Bulma** กันหน่อย
โดยเริ่มสร้าง **controller** ชื่อ *Home* และ **action** ชื่อ *index*
```bash
$ rails generate controller Home index
```

ทดลองใส่โค้ดแสดงผลง่ายๆ โดยใช้ **Bulma** ใน *index.html*
```html
<section class="section">
  <div class="container">
    <h1 class="title">
      Hello World
    </h1>
    <p class="subtitle">
      My first website with <strong>Bulma</strong>!
    </p>
  </div>
</section>
```

ตัวอย่างโค้ดสามารถเข้าไปดูได้[ที่นี่](https://bulma.io/documentation/overview/start/)
รันเว็บเซอร์เวอร์และเข้าไปยังหน้าเว็บผ่านเว็บบราวเซอร์
```bash
$ rails server
```

![index.html](/assets/images/posts/2019/using-bulma-with-rails/bulma-with-rails.png){:width="400px"}
*Bulma with Rails*

---
## พื้นฐานเกี่ยวกับ Bulma
จะว่าไป **Bulma** ก็คือ CSS Framework ที่ได้รับการออกแบบมาให้ใช้ความสามารถของ *Flexbox* เป็นหลักในการจัด layout ของเว็บไซด์ ซึ่งทำให้เราสามารถที่จะจัดหน้าตาของเว็บไซด์ได้ง่าย และสะดวกสบายมากยิ่งขึ้น แทนที่จะไปใช้ table เหมือนในสมัยก่อน นอกจากนี้ **Bulma** จะมีเพียงแค่ CSS เท่านั้น ทำให้มีขนาดเล็กกว่า CSS Framework ตัวอื่นๆ เหมาะสมกับการนำไปใช้ร่วมกับ javascript ใดๆ ก็ได้ไม่ว่าจะเป็น vanilla javascript หรือ jquery ที่นี้ลองมาดูความสามารถของ **Bulma** กัน

### การรองรับการแสดงผล
สำหรับ **Bulma** นั้นได้รับการออกแบบโดยคำนึงถึงอุปกรณ์มือถือเป็นอย่างแรก ทำให้การนำไปใช้แสดงผลบนอุปกรณ์มือถือนั้นสามารถทำได้ดีและสวยงาม โดย **Bulma** แบ่งกลุ่มการแสดงผลออกเป็น 5 กลุ่มด้วยกันคือ
- mobile โดยมีขนาดหน้าจอสูงสุดที่ 768px
- tablet ขนาดหน้าจอ 769px ขึ้นไป
- desktop ขนาดหน้าจอ 1024px ขึ้นไป
- widescreen ขนาดหน้าจอ 1216px ขึ้นไป
- fullhd ขนาดหน้าจอ 1408px ขึ้นไป

### Columns
กล่าวคือเมื่อมีการนำคอมโพเนนต์มาจัดเรียง Flexbox จะจัดการแสดงแบบอยุ่ในรูปของตาราง (grid) ซึ่งใช้ระบบ 12 คอลัมน์ต่อ 1 แถว

![Grid System](/assets/images/posts/2019/using-bulma-with-rails/grid-system.png){:width="500px"}
*Grid System with 12 columns*

![Columns](/assets/images/posts/2019/using-bulma-with-rails/example-columns.png){:width="500px"}
*Columns Example*

### Layout
- **Container** ใช้สำหรับจัดเรียงเนื้อหาให้อยู่ตรงกลางในแนวระนาบ

![Container](/assets/images/posts/2019/using-bulma-with-rails/example-container.png){:width="500px"}
*Container Example*

- **Level** ใช้สำหรับจัดเรียงเนื้อหา แยกเป็นระดับๆ ในแนวระนาบ

- **Media Object** เป็นโครงสร้างที่คล้ายกับการแสดงความเห็นในสื่อโซเชียล ซึ่งจะประกอบไปด้วยส่วนทางซ้ายสำหรับแสดงภาพ ส่วนตรงกลางสำหรับแสดงเนื้อหา และส่วนทางขวาสำหรับใส่เนื้อหาเพิ่มเติม

![Level](/assets/images/posts/2019/using-bulma-with-rails/example-level.png){:width="500px"}
*Level Example*

- **Hero** ใช้สำหรับแสดงพาดหัวข่าว (Banner) ในรูปแบบต่างๆ

![Hero](/assets/images/posts/2019/using-bulma-with-rails/example-hero.png){:width="500px"}
*Hero Example*

- **Section** ใช้สำหรับแยกเนื้อหาออกเป็นส่วนๆ
- **Footer** ใช้สำหรับแสดงเนื้อหาส่วนท้ายของเว็บไซด์

![Footer](/assets/images/posts/2019/using-bulma-with-rails/example-footer.png){:width="500px"}
*Footer Example*

- **Tiles** ใช้สำหรับแสดงเนื้อหาคล้ายแผ่นกระเบื้องมาต่อๆ กัน เหมือนกับการแสดงรูปภาพในเว็บไซด์ Pinterest

![Tile](/assets/images/posts/2019/using-bulma-with-rails/example-tile.png){:width="500px"}
*Tile Example*

### Elements
- **Box** ใช้สำหรับแสดงเนื้อหาในรูปแบบของกล่อง
- **Button** ใช้แสดงปุ่ม ซึ่งมีอยู่ด้วยกันหลายรูปแบบไม่ว่าจะเป็นลักษณะ สี รวมถึงสถานะการแสดงผล
- **Content** ใช้สำหรับแสดงเนื้อหาประเภท WYSIWYG ซึ่งรองรับเฉพาะ HTML Tag เท่านั้น
- **Delete** ใช้สำหรับแสดงเครื่องหมายลบ
- **Icon** ใช้สำหรับแสดงไอคอนต่างๆ
- **Image** ใช้สำหรับแสดงภาพ ซึ่งมีหลากหลายรูปแบบ และขนาด
- **Notification** ใช้สำหรับแสดงข้อความแจ้งเตือน
- **Progress bars** ใช้สำหรับแสดงแถบสถานะความก้าวหน้า
- **Table** ใช้สำหรับแสดงตาราง
- **Tag** ใช้สำหรับแสดงป้าย
- **Title** ใช้สำหรับแสดงหัวข้อ

สำหรับในบทความนี้ก็ขอนำแนะนำองค์ประกอบพื้นฐานไว้คร่าวๆ แต่เพียงเท่านี้ หากอยากศึกษาเพิ่มเติมถึงองค์ประกอบอื่นๆ เช่น ตัวช่วย (*Helpers*) คอมโพเนนต์ (*Components*) หรือการปรับแต่งสไตล์ (*Customization*) สามารถดูรายละเอียดได้จากเว็บไซด์ [Bulma](https://bulma.io)

## References
- [https://bulma.io](https://bulma.io)
- [https://github.com/joshuajansen/bulma-rails](https://github.com/joshuajansen/bulma-rails)
