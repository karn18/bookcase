---
layout: post
title: "[Stimulus] ใช้ CustomEvent สื่อสารกันระหว่าง Controllers"
author: Karn
tags:
- rails
- stimulus
- javascript
- customevent
categories: dev
cover: "/assets/images/posts/2021/use-customevent-to-communicate-between-stimulus-controllers/cover.png"
image:
  path: "/assets/images/posts/2021/use-customevent-to-communicate-between-stimulus-controllers/cover.png"
  width: 1200
  height: 630
date: 2021-02-05 09:48 +0700
---
บทความนี้จะสอนวิธีการง่ายๆ ของ Stimulus ในกรณีที่ต้องการให้ controller สื่อสารระหว่างกันผ่านการใช้ **CustomEvent** จากโจทย์ที่ว่าเราต้องการหน้าเว็บที่ประกอบไปด้วยเมนู และเมื่อคลิกในแต่ละเมนูก็จะไปดึงเนื้อหาของแต่ละหน้ามาแสดง ทั้งนี้ทั้งนั้นเราจะทำเป็น SPA กล่าวคือเมื่อทำการคลิกเลือกแต่ละเมนู หน้าเว็บจะโหลดเฉพาะเนื้อหาที่เปลี่ยนแปลงเท่านั้น (Partial HTML)<!--more-->

![example](/assets/images/posts/2021/use-customevent-to-communicate-between-stimulus-controllers/example.png){:width="600px"}
*ตัวอย่างหน้าเว็บ*

ก่อนที่จะเข้าเรื่อง ขอแวะเกริ่นในเรื่องการแบ่ง controller กันสักนิด ถ้าดูจากหน้าเว็บตัวอย่างข้างต้น เราคงคิดว่าใช้ controller เพียงตัวเดียวจัดการทั้งในส่วน **sidebar** และ **content** น่าจะใช้เพียง controller ตัวเดียวก็น่าจะดีที่สุด

![example](/assets/images/posts/2021/use-customevent-to-communicate-between-stimulus-controllers/single_controller.png){:width="600px"}
*ใช้ PageController ในการควบคุมหน้าเว็บ*

**!ถูกต้องแล้วหละครับ** ถ้าเรามองว่าหน้าเว็บของเราคงไม่มีฟีเจอร์อะไรเพิ่มเติม แต่ทันทีที่เราจะต้องมีคอมโพเนนต์อื่นๆ เพิ่มเข้ามาในหน้าเว็บการใช้ controller เพียงตัวเดียวอาจจะดูไม่เหมาะนัก ด้วยความที่โลจิกต่างๆ จะกองอยู่ที่เดียว ทำให้การกลับมาอ่านโค้ด หรือแก้ไขภายหลังเป็นเรื่องยากได้
ดังนั้นสิ่งที่ผมทำคือการเลือกแบ่ง controller ออกเป็น 2 ตัวได้กัน คือ

![example](/assets/images/posts/2021/use-customevent-to-communicate-between-stimulus-controllers/seperate_controller.png){:width="600px"}
*Sidebar และ Content Controller*

1. SidebarController
2. ContentController

-----

ประเด็นถัดมาที่จะเกิดขึ้นเมื่อมีการแยก controller คือแต่ละ controller จะสื่อสารกันอย่างไร ยกตัวอย่างเช่นในกรณีที่ผู้ใช้งานคลิกเปลี่ยนเมนูที่ Sidebar แล้ว Content จะรับรู้ได้อย่างไร เพื่อเปลี่ยนเนื้อหาให้ถูกต้องกับเมนูที่ผู้ใช้เลือก มาถึงจุดนี้ก็ต้องใช้ **CustomEvent** แล้วหละครับตามที่ได้เสนอไว้บนหัวเรื่อง

เริ่มจากการสร้าง HTML ที่แยกคอมโพเนนต์ได้เป็น 2 ส่วนด้วยกันคือ
1. คอมโพเนนต์ sidebar ที่ประกอบด้วยเมนู 2 เมนู และใช้ sidebar controller จัดการเหตุการณ์เมื่อมีการคลิก และส่งผ่าน url ขอเนื้อหาที่จะแสดง
2. คอมโพเนนต์ content ที่ใช้ content controller ในการควบคุมจะทำหน้าที่ในการดึงเนื้อหาจากเมนูที่ผู้ใช้คลิกจากหลังบ้าน มาแสดงผลบนส่วนที่กำหนดไว้

## index.html

```html
<main class="container section">
  <div class="columns">
    <div class="column is-one-third">
      <aside class="menu" data-controller="sidebar">
        <ul class="menu-list">
          <li><a data-action="click->sidebar#load" data-url="/about">About</a></li>
          <li><a data-action="click->sidebar#load" data-url="/contact">Contact</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <div class="card" data-controller="content" data-content-target="body" data-url="/about">
      </div>
    </div>
  </div>
</main>
```

## sidebar_controller.js

มาถึง sidebar controller สิ่งที่ต้องทำคือการกำหนดเหตุการณ์เมื่อผู้ใช้งานทำการคลิกเมนู ในที่นี้จะเรียกใช้ `load` และสร้าง `CustomEvent` ซึ่งกำหนดชื่อตามที่เราต้องการ แต่ก็ควรจะสื่อความหมาย พร้อมกับแนบ url สำหรับเปิดไปด้วย จากนั้นก็จะเรียก `document.dispathEvent` เพื่อส่งเหตุการณ์ออกไป

```javascript
import { Controller } from "stimulus"

export default class extends Controller {
  ...

  load (event) {
    const url = event.target.getAttribute("data-url")
    document.dispatchEvent(new CustomEvent('sphere:load-content', { detail: { url } }))
    event.preventDefault()
  }

  list () {
    return document.querySelectorAll("li > a[data-url]")
  }
}
```

และในส่วน content controller จะต้องทำการรับเหตุการณ์เมื่อมีการคลิกเมนูผ่าน `document.addEventListener` เมื่อมีเหตุการณ์วิ่งเข้ามาก็จะแกะเอา url ไปดึงเนื้อหามาแสดงบน `body`

```javascript
import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = [ "body" ]

  connect () {
    document.addEventListener('sphere:load-content', this.loadContent.bind(this))
    let defaultURL = this.bodyTarget.getAttribute("data-url")
    this.load(defaultURL)
  }

  loadContent (event) {
    let url = event.detail.url
    this.load(url)
  }

  ...
}

```

การใช้ **CustomEvent** ในการสื่อสารระหว่างคอมโพเนนต์จะมีข้อดีตรงที่เมื่อเรามีคอมโพเนนต์ใหม่เกิดขึ้นมา เราก็สามารถเพิ่มการรับรู้เหตุการณ์เข้าไปได้ทันที และแยกโค้ดให้แต่ละ controller ทำงานของมันอย่างใดอย่างหนึ่งก็ทำให้โค้ดของเรา clean ขึ้นด้วย 

สุดท้ายก่อนจะจบ สำหรับ Stimulus แล้วยังยังมีอีกวิธีหนึ่ง ที่ใช้สำหรับการสื่อสารระหว่าง controller นั้นก็คือการเรียก reference ของ controller ผ่านตัวผ่านตัวแปร `application` ดังแสดงในโค้ดด้านล่าง

```javascript
export default class extends Controller {
  ...

  get listController () {
    return this.application.getControllerForElementAndIdentifier(this.element, "list")
  }
}
```

## References
- [Create Custom Events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events)
- [Communication Between Controllers](https://github.com/hotwired/stimulus/issues/35)
- [Inspired by this tweet from Matt Swanson](https://twitter.com/_swanson/status/1356620139102306305)
****