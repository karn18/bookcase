---
layout: post
title: เพิ่ม Component Importmap Autoloader เมื่อใช้งานร่วมกับ ​React หรือ Vue
author: Karn
tags:
- ruby
- rails
- stimulus
- importmap
categories: dev
date: 2021-08-23 21:58 +0700
---
ต่อเนื่องจาก [Using importmap on Rails 6]({% post_url 2021-08-18-using-importmap-on-rails-6 %}) จะเห็นได้ว่าตัวอย่างโค้ดมีการใช้งาน Stimulus ซึ่งคอนโทรลเลอร์ที่ได้นิยามไว้ในโฟลเดอร์ `app/javascript/controllers` จะถูกนำเข้าไปรวมกับ `application.js` แบบอัตโนมัติทุกตัวผ่านโมดูล `stimulus-importmap-autoloader`<!--more-->

```javascript
import "@hotwired/stimulus-importmap-autoloader"
```

ส่วนคอมโพแนนท์ของ React หรือ Vue เราจะต้องใส่เพิ่มเข้าไปทีละคอมโพแนนท์ในไฟล์ `application.js`

```javascript
import 'components/reverse_component'
import 'components/clock'
```

แบบคงไม่สะดวกแน่ ถ้าเราต้องมาเพิ่มคอมโพแนนท์ใหม่เข้าไปทุกๆ ครั้งเมื่อสร้างคอมโพแนนท์ใหม่ แน่นอนว่าเราจะต้องมี Autoloader สำหรับคอมโพแนนท์เหมือนกับ ​Stimulus ที่โหลดคอนโทรลเลอร์เข้าไปให้อัตโนมัติ ซึ่งเราก็ไปศึกษาโค้ด autoloader ของ Stimulus และนำมาปรับใช้กับคอนโพแนนท์แทน ดังนี้

```javascript
// app/javascript/helpers/component-importmap-autloader.js
const importmap = JSON.parse(document.querySelector("script[type=importmap]").text)
const componentsPaths = Object.keys(importmap.imports).filter((e) => e.match("components/"))

componentsPaths.forEach(function(path) {
  const name = path.replace("components/", "")
  import(path)
    .then(module => console.log(module))
    .catch(error => console.log(`Failed to autoload components: ${name}`, error))
})
```

หลักการเบื้องต้นของโค้ด คือ
1. ไปค้นหาคอมโพแนนท์ทั้งหมดที่อยู่ใน script ซึ่งมี type เป็น importmap ซึ่งตรงนี้เกิดขึ้นจากโค้ดที่มีการเรียกใช้ `pin_all_from`
2. โหลดคอมโพแนนท์ทั้งหมดเข้าไปโดยผ่านการใช้งาน dynamic import 

ด้วยวิธีการดังกล่าวสามารถทำให้เรานำเข้าคอมโพแนนท์ที่อยู่ภายใต้โฟลเดอร์ `app/javascript/components` ซึ่งไม่ว่าจะเป็น React หรือ Vue ก็จะถูกโหลดเข้าไปได้หมดเลย

# References
- [Stimulus Importmap Autoloader](https://github.com/hotwired/stimulus-rails/blob/main/app/assets/javascripts/stimulus-importmap-autoloader.js)
- [Dynamic Import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports)
- [โค้ดตัวอย่าง](https://github.com/karn18/hot_espresso)
