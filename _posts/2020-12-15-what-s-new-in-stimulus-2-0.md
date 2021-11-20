---
layout: post
title: มีอะไรใหม่ใน Stimulus 2.0
author: Karn
tags:
- rails
- stimulus
categories: dev
cover: "/assets/images/posts/2020/what-s-new-in-stimulus-2-0/cover.png"
image:
  path: "/assets/images/posts/2020/what-s-new-in-stimulus-2-0/cover.png"
  width: 1200
  height: 630
date: 2020-12-15 23:08 +0700
---
หลังจากที่ **Stimulus** ได้ปล่อยเวอร์ชัน 2 ออกมา เรามาดูกันดีกว่าว่ามีอะไรใหม่ๆ เพิ่มมาบ้าง
1. เพิ่ม **API** ขึ้นมา 2 ตัวคือ **values** และ **CSS classes** ซึ่งก็เอามาใช้แทนที่ **data map** ในเวอร์ชัน 1 ซึ่งรูปแบบเดิมที่ใช้อยู่ก็ยังสามารถใช้ได้ แต่ **document** จะถูกเอาออกจากหน้าเว็บ ทางที่ดีก็ควรเปลี่ยนรูปแบบใหม่จะดีกว่า ถ้าโปรเจ็คได้อัพเดตเป็นเวอร์ชัน 2 แล้ว<!--more-->

    - **Value**

    ![01](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_01.png)
    *Controller V1*

    ![02](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_02.png)
    *Controller V2*

    ![03](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_03.png)
    *HTML V1*

    ![04](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_04.png)
    *HTML V2*

    จะเห็นว่าใน **Controller** ของเวอร์ชัน 2 จะมีการใช้ `static values` เพื่อผูกกับ data attributes ทำให้เราสามารถเรียกใช้ค่า หรือกำหนดค่าผ่านชื่อตัวแปรได้ ซึ่งก็สะดวกสบายกว่าเวอร์ชัน 1
    ส่วนในฝั่ง **HTML** ก็แตกต่างกันเล็กน้อย โดยการเพิ่ม `-value` ตามหลัง data attributes

    - **Class**

    บ่อยครั้งที่เราจะใช้ JavaScript ในการควบคุม CSS เพื่อให้แสดงผลที่สอดคล้องกับการใช้งาน เช่น เมื่อมีการกดปุ่มโหลดข้อมูลก็จะแสดงไอคอน Loading บ้าง การแสดงภาพเคลื่อนไหวบ้าง 

    ![05](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_05.png)
    *Controller V2*

    ![06](/assets/images/posts/2020/what-s-new-in-stimulus-2-0/stimulus2_06.png)
    *HTML V2*

    ตัวอย่างข้างต้นจะเป็นการใช้ **CSS** ในการอนิเมชัน เพื่อหงายการ์ดเมื่อใช้เม้าส์คลิกที่การ์ด สิ่งที่เพิ่มเข้าไปใน **Contrller** เป็นการใช้ static `classes` ในการผูก data attributes กับตัวแปร จากนั้นก็เพิ่ม data attribute ใน **HTML** โดยใช้รูปแบบ `data-[identifier]-[name]-class="className"`

2. รองรับ **DOM event listener options** เมื่อมีการเรียกใช้งาน **action** ซึ่งก็ไปตามดูได้ใน[มาตรฐาน](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

3. เปลี่ยน syntax ในการผูกความสัมพันธ์ระหว่าง **identifier** กับ **target** จากเดิมที่เป็น `data-target="[identifier].[name]"` เป็น `data-[identifier]-target="[name]"`

## References
- [Announcing Stimulus 2.0](https://discourse.stimulusjs.org/t/announcing-stimulus-2-0/1482)
- [StimulusJS](https://stimulusjs.org/)
