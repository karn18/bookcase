---
layout: post
title: Monkey Path to History.pushState
tags:
  - javascript
  - html
categories: dev
date: 2020-06-26 16:56 +0700
---
เพื่อให้ผู้ใช้งานเว็บได้รับประสบการณ์ที่ดีในการท่องเว็บเมื่อมีการคลิกเปลี่ยนหน้าเว็บ แทนที่จะต้องโหลดหน้าเว็บทั้งหน้า ก็จะเลือกใช้แนวทางที่จะโหลดเฉพาะบางส่วนมาแสดงผลผ่านการเรียกใช้ **Ajax Request** ร่วมกับ **History API**
หรือเรียกสั้นๆ ว่า **pjax (PushState + Ajax)** สำหรับผู้ใช้ **Rails** เราก็มี **turbolinks** เป็นตัวจัดการให้เราได้อย่างง่ายดาย<!--more-->

ถ้าเราลองไปศึกษาดู **History API** จะพบว่าไม่ได้มี **iterface** ให้กับเหตุการณ์ `pushState` ทำให้เราไม่สามารถรับรู้ได้ว่าเมื่อไหร่เกิดการเปลี่ยน **state**
ดังน้้นในตอนนี้ถ้าหากเราต้องการรับทราบเหตุการณ์ก็ต้อง **Monkey Patch** ให้กับเหตุการณ์ดังนี้

# Monkey Patch

```javascript

function stateListener(type) {
  const orig = his[type]
  return function () {
    const rv = orig.apply(this, arguments)
    const event = new Event(type)
    event.arguments = arguments
    dispatchEvent(event)
    return rv
  }
}

history.pushState = stateListener("pushState")
```

เพียงเท่านี้เราก็สามารถจะ `addEventListener` ให้กับ `pushState` ได้แล้ว แถมให้อีกนิดหนึ่งสำหรับการใช้ **turbolinks** เราก็จะใช้ `addEventListener` ให้กับ custom event ที่ชื่อว่า `turbolinks:load`

## References
- [Get Notified about changes of the history](https://stackoverflow.com/questions/4570093/how-to-get-notified-about-changes-of-the-history-via-history-pushstate/25673946#answer-4585031)
- [Turbolinks](https://github.com/turbolinks/turbolinks)