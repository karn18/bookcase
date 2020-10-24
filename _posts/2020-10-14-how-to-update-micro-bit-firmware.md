---
layout: post
title: How to update micro:bit firmware
author: Karn
tags:
  - microbit
categories: stem
cover: "/assets/images/posts/2020/how-to-update-micro-bit-firmware/cover.png"
image:
  path: "/assets/images/posts/2020/how-to-update-micro-bit-firmware/cover.png"
  width: 1200
  height: 630
date: 2020-10-14 22:29 +0700
---
**Firmware** คือโปรแกรมแกรม (**Software**) ที่ถูกพัฒนาเพื่อใช้สำหรับควบคุมการทำงานของอุปกรณ์ต่างๆ (**Hardware**) ให้ทำงานได้ราบรื่น แม้กระทั่ง **micro:bit** เองก็ต้องมี **Firmware** เช่นกันซึ่งถูกฝังอยู่ในชิปบนบอร์ด สำหรับการอัพเดตเวอร์ชันของ **Firmware** ให้ทันสมัยก็จะช่วยให้การทำงาน **micro:bit** ดียิ่งขึ้น 

## ตรวจสอบเวอร์ชันของ Firmware

เราสามารถตรวจสอบเวอร์ชันของ **Firmware** ที่ติดตั้งอยู่บน **micro:bit** ได้ไม่ยาก เพียงแค่ต่อบอร์ด **micro:bit** ผ่านสาย USB เข้ากับเครื่องคอมพิวเตอร์ของเรา จากนั้นให้เปิดไฟล์ **DETAILS.TXT** บนไดรฟ์ **MICROBIT**

![MICROBIT Drive](/assets/images/posts/2020/how-to-update-micro-bit-firmware/microbit_drive.png){:width="400px"}
*MICROBIT Drive*

![DETAILS.TXT](/assets/images/posts/2020/how-to-update-micro-bit-firmware/details.png)
*Firmware: 0250*

ใ้ห้เราสังเกตที่บันทัดที่ขึ้นต้นว่า `Interface Version` ซึ่งจะเห็นว่า **micro:bit** มีเวอร์ชันของ **Firmware** เป็น `0250`

## อัพเดตกันได้เลย

มาดูที่วิธีการอัพเดต **Firmware** กันบ้าง โดยเวอร์ชันของ **Firmware** ล่าสุดจะเป็นเวอร์ชัน `0253`

- ดาว์นโหลด **Firmware** มาไว้ที่เครื่องจาก[ที่นี่](https://cdn.sanity.io/files/ajwvhvgo/production/5ecfa4d407a9d02e0f2e7fe192e5fa6a246f8621.hex?dl=0253_kl26z_microbit_0x8000.hex) ไฟล์ที่ดาว์นโหลดมาจะเป็นไฟล์ `.hex`
- ถอดสาย **USB** ที่เชื่อมต่อออกจาก **micro:bit** รวมถึงไฟเลี้ยงด้วย
- กดปุ่ม **Reset** แช่เอาไว้ พร้อมกับต่อสาย **USB** เข้ากับตัว **micro:bit** โดยในคราวนี้จะปรากฏเป็นไดรฟ์ **MAINTENANCE** ขึ้นมาแทนที่จะเป็น **MICROBIT**

![MAINTENANCE Drive](/assets/images/posts/2020/how-to-update-micro-bit-firmware/maintenance_drive.png){:width="400px"}

- ลากไฟล์ `.hex` เข้าไปยังไดรฟ์ **MAINTENANCE** ขณะที่ทำการอัพเดตจะปรากฏไฟสีเหลืองกระพริบที่ด้านหลังของบอร์ด รอจนกว่าไฟจะหยุดกระพริบ และบอร์ดทำการรีเซทตัวเองและปรากฏไดรฟ์ **MICROBIT** ขึ้นมาอีกรอบ นั้นแสดงว่าเราได้ทำการอัพเดต **Firmware** ใหม่สำเร็จเรียบร้อย

- ตรวจสอบไฟล์ **DETAILS.TXT** ดูอีกรอบว่ามีแสดงเลขเวอร์ชันเป็น `0253` ถูกต้องหรือไม่

![NEW FIRMWARE](/assets/images/posts/2020/how-to-update-micro-bit-firmware/new_version.png)
*Firmware: 0253*

## References
- [https://microbit.org/get-started/user-guide/firmware/](https://microbit.org/get-started/user-guide/firmware/)
