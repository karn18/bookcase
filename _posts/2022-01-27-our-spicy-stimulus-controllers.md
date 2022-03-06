---
layout: post
title: Our Spicy Stimulus Controllers
description: มาดูกันหน่อยว่าที่ผ่านมา เราได้พัฒนา Stimulus Controller อะไรขึ้นมาใช้กันบ้าง และเพิ่มความเผ็ดร้อนให้กับโค้ดของเราได้อย่างไร
author: Karn
tags:
- javascript
- stimulus
categories: dev
date: 2022-01-27 20:40 +0700
---
เรามาลองรีวิว **Stimulus Controllers** ที่เราได้พัฒนาขึ้นมาใช้กันในโปรเจ็คต่างๆ ดูว่ามีอะไรกันบ้าง และเพิ่มความเผ็ดร้อนให้กับโค้ดของเราได้อย่างไร

> เอาจริงเคยได้ยินมาว่า ตัวอย่างโค้ดก็เหมือนกับเครื่องปรุง (Ingredient) ที่สามารถหาได้ทั่วไปตามอินเทอร์เน็ต เพียงการมาเพิ่มความเผ็ดร้อน (Spicy) ก็ขึ้นอยู่ในการจะพลิกแพลงนำไปใช้งาน

## Spinner

เป็น controller ที่ใช้แสดงสถานะว่ากำลังทำงานอยู่ เมื่อฟอร์มถูก `submit` โดยจะใส่ svg ที่เป็น spinner เข้าไปใน `button` แต่ในกรณีที่ใช้เป็น `input` ก็จะใส่ข้อความ  `Waiting...` เข้าไปแทน

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/spinner.png){:width="400px"}
*Spinner*

## Toast

เป็น controller ที่ใช้แสดงข้อความแจ้งในลักษณะที่เป็น Toast โดยจะมีเวลาในการแสดงอยู่ ถ้าหมดเวลาก็จะปิดไปเองโดยอัตโนมัติ

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/toast.png){:width="400px"}
*Toast*

## Sidebar

เป็น controller ที่ใช้จัดการกับเมนูเมื่อหน้าจอที่ใช้งานมีขนาดเล็ก โดยจะแสดงเมนู burger ขึ้นมาแทน และใช้การสไลด์ออกมาเมื่อคลิก เพื่อเพิ่มพื้นที่ในการแสดงผลหลักเมื่ออยู่บนหน้าจอขนาดเล็กนั้นเอง

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/sidebar.png){:width="600px"}
*Sidebar*

## Infinite Scroll

เป็น controller ที่ใช้ในการดึงข้อมูลแต่ละหน้ามาแสดง เพียงแต่แทนที่จะแสดงเป็น **pagination** เราได้นำเสนอผ่าน **infinite scroll** แทน

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/infinite-scroll.png){:width="300px"}
*Infinite Scroll*

## Treeview

เป็น controller ในการจัดการข้อมูลให้แสดงอยู่ในรูป Treeview เนื่องจากข้อมูลสามารถแบ่งได้หลายกลุ่ม และแต่ละกลุ่มก็จะมีข้อมูลย่อยๆ อีกภายใน

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/treeview.png){:width="500px"}
*Treeview*

## Date Picker

เป็น controller ที่ใช้สำหรับแสดงตัวเลือกวัน เดือน ปีโดยจะเรียกใช้งานผ่าน `vanillajs-date-picker` อีกทีหนึ่ง

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/date-picker.png){:width="300px"}
*Date Picker*

## Map

เป็น controller ที่ใช้สำหรับแสดงผลแผนที่โดยเรียกใช้งานผ่าน `leaflet` และจัดการพล๊อตกราฟแบบ **Choropleth** เพื่อแสดงความเข้มข้นของข้อมูล

![](/assets/images/posts/2022/our-spicy-stimulus-controllers/map.png){:width="500px"}
*Map*

จากที่เห็นข้างต้น เป็น controller เพียงส่วนหนี่งที่เราพัฒนาขึ้นมา และสามารถนำไป **reuse** ใช้กับโปรเจ็คอื่นๆ ได้ ทั้งนี้โค้ดส่วนใหญ่สามารถหาดูได้จากอินเทอร์เน็ต เพียงแต่เราอาจจะมาเพิ่มลูกเล่นบ้างอย่างเข้าไปให้เหมาะกับงานของเรา
