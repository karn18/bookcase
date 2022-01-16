---
layout: post
title: เพิ่มการเชื่อมโยงลิงค์ในหน้าเว็บด้วย Stimulus
description: ลิงค์ Anchor เป็นอีกวิธีการหนึ่งที่จะทำให้เราสามารเข้าถึงเนื้อหาภายในหน้าเว็บได้ง่ายขึ้น
  ผ่านการปักสมอหรือหมุดไม่ว่าจะด้วยชื่อหรือไอดีไว้บน Heading ต่างๆ
author: Karn
tags:
- jekyll
- stimulus
- anchor
categories: dev
cover: "/assets/images/posts/2021/adding-anchor-links-to-headings-with-stimulus/cover.png"
image:
  path: "/assets/images/posts/2021/adding-anchor-links-to-headings-with-stimulus/cover.png"
  width: 1200
  height: 800
date: 2021-12-29 17:56 +0700
---
ลิงค์ Anchor เป็นอีกวิธีการหนึ่งที่จะทำให้เราสามารเข้าถึงเนื้อหาภายในหน้าเว็บได้ง่ายขึ้น ผ่านการปักสมอหรือหมุดไม่ว่าจะด้วยชื่อหรือไอดีไว้บน Heading ต่างๆ สำหรับบล๊อกนี้สร้างขึ้นด้วย **Jekyll** ซึ่งเนื้อหาจะถูกสร้างขึ้นจาก Markdown เป็น HTML แต่ Markdown เองก็ไม่ได้ Syntax ที่รองรับให้มีลิงค์ Anchor ด้วย ดังนั้นเราจะมาเพิ่มเติม Anchor ให้เว็บของเราด้วย **Stimulus** กัน

```javascript
// javascripts/controllers/anchor_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static headings = [ "h1", "h2", "h3", "h4", "h5", "h6" ]
  static values = { idEnabled: Boolean }
  static classes = [ "anchorLink" ]

  connect () {
    const headings = document.querySelectorAll(this.constructor.headings.join(","))
    const anchorLinkClass = this.hasAnchorLinkClass ? this.anchorLinkClass : "anchor-link"
    headings.forEach(heading => {
      const id = this.slugify(heading.innerHTML)
      if (this.idEnabledValue) { heading.id = id }
      heading.innerHTML = `<a href="#${id}" class="${anchorLinkClass}">${heading.innerText}<\/a>`
    })

    document.addEventListener("turbo:click", (event) => {
      if (event.detail.url.includes("#")) {
        return event.preventDefault()
      }
    })
  }

  slugify (text) {
    return text.replace(/^\s+|\s+$/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase()
  }
}
```

โค้ดข้างต้นเราจะทำการค้นหา Heading ที่เราต้องการจะใส่ลิงค์ Anchor เข้าไปโดยไล่ตั้งแต่ **\<h1/>** ไปถึง **\<h6/>** จากนั้นเราก็ยัด **\<a/>** ที่มี href เชื่อมโยงกับ Heading นั้นๆ ไว้ภายใน

ในกรณีที่มีการใช้งานร่วมกัน **Turbo** เราจะต้องเพิ่มการรับฟังเหตุการณ์จาก `turbo:click` ไว้ด้วย โดยถ้า URL ที่คลิกมีเครื่องหมาย `#` เราจะต้องหยุดไม่ให้โค้ดทำงานต่อ เพราะจะทำให้ลิงค์ที่กดไม่เชื่อมโยงไปยัง Anchor ที่เรากำหนดไว้

เอาจริงตอนแรกได้ทดลองใช้ `anchor-js` แล้วรู้สึกว่าใช้งานง่ายมาก แต่ตอนปรับแก้ CSS แล้วมันยากนิดหน่อยก็เลยเลือกที่จะเขียนโค้ดที่จัดการทุกอย่างเอง สำหรับตัวอย่างการใช้งานโค้ดก็ดูได้ในเว็บของเราได้ เพราะได้ทำการ deploy เอาไว้แล้ว

## References
- [anchor-js](https://github.com/bryanbraun/anchorjs)
