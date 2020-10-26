---
layout: post
title: ป้ายไฟแสดงชื่อด้วย micro:bit
author: Karn
tags:
- basic
- microbit
categories: stem
cover: "/assets/images/posts/2020/moving-display/cover.png"
image:
  path: "/assets/images/posts/2020/moving-display/cover.png"
  width: 1200
  height: 630
date: 2020-10-25 15:29 +0700
---
**micro:bit** สามารถนำมาทำเป็นป้ายไฟได้ด้วยนะ ซึ่งการเขียนโค้ดแสดงป้ายไฟนี้
น้องๆ จะได้เรียนรู้การแสดงผลตัวอักษรผ่านบล็อก **show leds** การหน่วงเวลาการแสดงผลโดยใช้บล็อก **pause** และการทำงานของโปรแกรมต่อเนื่องตามลำดับจากบล็อกสู่บล็อก 🌈<!-- more -->

## เริ่มต้นกันเลย

- เปิดโปรแกรม **Microsoft MakeCode** ขึ้นมาและสร้างโปรเจคใหม่ว่า **ป้ายไฟ**

![new project](/assets/images/posts/2020/moving-display/new_project.png)
*สร้างโปรเจค ป้ายไฟ*

- สำหรับป้ายไฟปกติแล้วจะแสดงข้อความวนไปเรื่อยๆ ดังนั้นเราจะใช้บล็อก **forever** เพื่อให้โปรแกรมสามารถทำงานวนไปเรื่อยๆ ไม่มีที่สิ้นสุดได้

![makecode1](/assets/images/posts/2020/moving-display/makecode1.png)
*บล็อก leds ต่อเข้ากับบล็อก forever*

- ป้ายไฟในวันนี้จะแสดงชื่อของเราเอง ซึ่งป้ายไฟของผมก็จะเป็น `KARN`
- เริ่มลากบล็อก **show leds** มาต่อกับบล็อก **forever** จากนั้นปรับ leds ให้แสดงตัวอักษร โดยแต่ละบล็อกแสดง 1 ตัวอักษรเท่านั้น

![makecode2](/assets/images/posts/2020/moving-display/makecode2.png){:width="200px"}
*ปรับบล็อก show leds ให้แสดงตัวอักษร K*

- ต่อตัวอักษรให้เป็นคำตามที่ต้องการ และตรวจสอบผลลัพท์บนบอร์ด **micro:bit** จำลอง

![simulator1](/assets/images/posts/2020/moving-display/simulator1.gif)
*ป้ายไฟแสดงข้อความ KARN*

- จะสังเกตเห็นว่าตอนนี้ตัวอักษรจะวิ่งค่อนข้างเร็ว จนทำให้ตาเรามองมันทันว่าป้ายไฟของเราพยายามจะแสดงคำว่าอะไร
- เพื่อหน่วงเวลาในการแสดงผลตัวอักษรแต่ละตัวให้ช้าขึ้น ให้เราลากบล็อก **pause** ระหว่างตัวอักษร 

![simulator1](/assets/images/posts/2020/moving-display/makecode3.png)
*บล็อก pause*

- ทดลองปรับเวลาในการหน่วงบนบล็อก **pause** และสังเกตความแตกต่าง

![simulator1](/assets/images/posts/2020/moving-display/makecode4.png){:width="200px"}
*บล็อกคำสั่งที่สมบูรณ์*

![simulator1](/assets/images/posts/2020/moving-display/simulator2.gif)
*ป้ายไฟที่ปรับความเร็วในการแสดงผลแล้ว*

> 💡 นอกจากการใช้บล็อก **show leds** มาใช้แสดงตัวอักษร เรายังสามารถใช้บล็อก **show string** มาใช้แทนได้ด้วยนะ ลองไปทดลองเล่นกันดู

- เมื่อปรับเปลี่ยนความเร็วในการแสดงผลเป็นที่พอใจแล้ว ที่นี่เรามาโหลดโปรแกรมเข้าไปยัง **micro:bit** ดู

![microbit](/assets/images/posts/2020/moving-display/microbit.gif)
*รันโค้ดป้ายไฟบน micro:bit*
 