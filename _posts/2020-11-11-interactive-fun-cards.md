---
layout: post
title: Interactive Fun Cards
author: Karn
tags:
- rails
- stimulus
categories: dev
cover: "/assets/images/posts/2020/interactive-fun-cards/cover.jpg"
image:
  path: "/assets/images/posts/2020/interactive-fun-cards/cover.jpg"
  width: 1200
  height: 630
date: 2020-11-11 11:42 +0700
---
⚡ ปัจจุบันนี้ถ้าจะพัฒนาเว็บให้ดึงดูดผู้ใช้งาน คงหลีกเลี่ยงไม่ได้ที่จะทำให้เว็บดูสวยๆ และต้องมี interactive กับผู้ใช้ด้วยการแสดงอนิเมชันต่างๆ แน่นอนว่าในบทความนี้จะแสดงตัวอย่างการใช้ **StimuluJS** 🌈 มาช่วยจัดการเว็บกันหน่อย<!--more--> เรามาดูกันว่าโจทย์สำหรับบทความนี้จะเป็นอะไร

## โจทย์

สุ่มตัวเลขตามจำนวนการ์ดที่กำหนดไว้ 🎲 โดยในเบื้องต้นจะให้คว่ำการ์ดเอาไว้ก่อน จนกว่าจะมีการคลิกจึงจะเปิดหน้าการ์ดขึ้นมาเพื่อแสดงตัวเลข โจทย์ในวันนี้ช่างง่ายดายจริงๆ มาลองพัฒนากันดู

## แนวทางการพัฒนา

- โดยหลักๆ แล้ววันนี้เราจะใช้ stimulus controller 2 ตัวมาใช้ในการควบคุมด้วยกัน
  - GameController โดยเมื่อถูกสร้างขึ้นมาจะมีการสุ่มตัวเลข ตามจำนวนการ์ดที่ได้รับมาจากหลังบ้าน (Backend) และเก็บเอาไว้ ทันทีที่การ์ดแต่ละใบถูกสั่งให้เปิดก็จะแสดงตัวเลข

  - CardController ใช้สำหรับควบคุมการเปิด/ปิดการ์ดแต่ละใบ โดยเมื่อการ์ดถูกเปิดแล้วจะมีระยะเวลาจำกัด 2 วินาที และจะปิดการ์ดทันที

## ผลลัพธ์

![fun game](/assets/images/posts/2020/interactive-fun-cards/fun_game.gif)

## เรียนรู้อะไรบ้าง

- เราสามารถใช้ **controller** หลายๆ ตัวร่วมกันได้
- ถ้าเราออกแบบดีๆ เราก็สามารถนำ **controller** ไป reuse ใช้ได้กับ component อื่นๆ ได้ จากตัวอย่างก็จะเห็นว่าการ์ดแต่ละใบก็จะใช้ **Card Controller** แยกออกจากกัน

```erb
<div class="card" data-controller="card" data-card-openned="false" data-target="game.card card.element" data-game-index="<%= index %>"
  data-action="click->game#showCard click->card#flip">
  <div class="card__inner">
    <div class="card__front">
        <%= image_tag 'back.png', class: "image" %>
    </div>
    <div class="card__back">
    </div>
   </div>
</div>
```

ถ้าอยากดูรายละเอียดเพิ่มเติมดูได้จาก repo ที่แชร์ไว้ด้านล่างนะครับ 👇

# References
- [Fun Games](https://github.com/karn18/fun_games)
- [CSS for fliping card](https://codepen.io/james_gillen/pen/NGwqML)
