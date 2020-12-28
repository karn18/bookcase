---
layout: post
title: What is micro:bit
author: Karn
tags:
    - microbit
categories: stem
cover: "/assets/images/posts/2020/what-is-micro-bit/cover.png"
image:
  path: "/assets/images/posts/2020/what-is-micro-bit/cover.png"
  width: 1200
  height: 630
date: 2020-10-13 22:16 +0700
---
การศึกษาในศตวรรษที่ 21 การแค่ให้เด็กท่องๆ จำๆ ตัวอักษรตามตำราแล้วไปสอบนั้นคงไม่พอที่จะเอาตัวรอดอีกต่อไป สำหรับเด็กในยุคนี้การศึกษาด้วยแนวทางใหม่ที่เรียกว่า **STEM** ถือเป็นแนวทางการศึกษาที่จะถูกคิด และบูรณาการศาสตร์จาก 4 แขนง อันได้แก่ **วิทยาศาตร์(Science) เทคโนโลยี(Technology) วิศวกรรมศาสตร์(Engineering) และคณิตศาสตร์(Mathematics)** เพื่อจะทำให้เด็กเกิดความคิดสร้างสรรค์ รู้จักประยุกต์ความรู้ที่ได้ไปใช้งานให้เหมาะสม และเข้าใจในนวัตกรรมที่เกิดขึ้น<!--more-->

การเขียนโค้ดหรือโปรแกรมมิ่ง (**Programming**) เป็นอีกหนึ่งทักษะที่จะกระตุ้นให้เด็กๆ เกิดการเรียนรู้ **STEM** โดยในบทความนี้จะแนะนำการเขียนโค้ดผ่าน **micro:bit** ซึ่งเป็นบอร์ดไมโครคอนโทรลเลอร์ที่ได้รับการออกแบบพัฒนาขึ้นมาโดย **BBC** และความร่วมมือของพันธมิตรในการพัฒนาชุดเครื่องมือสำหรับการเขียนโค้ดด้วย **micro:bit** นอกจากนั้นยังได้มีการแจกจ่าย **micro:bit** จำนวน 1 ล้านชิ้นให้กับโรงเรียนทั่วประเทศอังกฤษเพื่อเป็นสื่อการเรียนการสอนการเขียนโค้ดให้กับเด็กๆ

## องค์ประกอบของ micro:bit

![Components](/assets/images/posts/2020/what-is-micro-bit/components.png){:width="500px"}
*micro:bit*

ขอแยกอธิบายแต่ละด้านของ **micro:bit** แล้วกัน

- ด้านหน้า

![Front](/assets/images/posts/2020/what-is-micro-bit/front.png){:width="300px"}

1. ปุ่ม A และ B

    เราสามารถเขียนโค้ดเพื่อรับการกดปุ่ม เพื่อสั่งให้บอร์ดทำอย่างอื่นต่อได้

2. ไฟ LED ขนาด 5x5

    ใช้สำหรับแสดงผลต่างๆ ไม่ว่าจะเป็นตัวเลข ตัวอักษร กราฟ หรือภาพ โดยไฟจะสว่างเป็นสีแดง นอกจากนั้นเรายังสามารถควบคุมระดับความสว่างของหลอดไฟได้ด้วย

3. GPIO Pins

    เป็นพินที่ใช้สำหรับต่อวงจรภายนอก ถ้าดูจากภาพแล้วจะประกอบไปด้วยพินขนาดใหญ่จำนวน 3 พิน ระหว่างพินจะมีพินขนาดเล็กรวมกันทั้งหมด 20 พิน โดยแต่ละพินสามารถใช้รับ/ส่งสัญญาณได้ทั้งแบบแอนะล็อก (Analog) และดิจิทัล (Digital)

4. 3V Pin

    พินสำหรับต่อไฟขนาด 3 โวลต์ เพื่อเป็นแหล่งจ่ายไฟให้กับอุปกรณ์ที่มาต่อ

5. GND Pin

    พินสำหรับต่อกราวด์

> สำหรับพินทั้งหมดที่อยู่บนบอร์ดจะด้วยกันทั้ง 25 พิน

- ด้านหลัง

![Front](/assets/images/posts/2020/what-is-micro-bit/back.png){:width="300px"}

1. ตัวรับส่งสัญญาณคลื่นวิทยุ (Radio) และบลูทูธพลังงานต่ำ (Bluetooth Low Energy ~ BLE)

    **micro:bit** สามารถติดต่อสื่อสารระหว่างกันผ่านคลื่นวิทยุ และสามารถใช้เชื่อมต่อกับอุปกรณ์มือถือหรือแทบเล็ตผ่านบลูทูธ

2. หน่วยประมวลผล

    เป็นศูนย์กลางในการประมวลผล หรือเรียกได้ว่าเป็นสมองของบอร์ด **micro:bit** นั้นเอง

3. เซนเซอร์วัดความเข้มสนามแม่เหล็ก (Magnatic Sensor) หรือเข็มทิศ

    นั้นทำให้เราสามารถเขียนโค้ดเพื่อใช้สำหรับบอกทิศที่อยู่ตรงหน้าเราได้

4. เซนเซอร์วัดความเร่ง (Accelerometer Sensor)

    การตรวจจับการเคลื่อนที่ การตก การสั่น หรือการเอียงของบอร์ด ก็นำไปประยุกต์ใช้ในการควบคุมอุปกรณ์อื่นๆ ได้ไม่ยาก

5. Pins

6. Micro USB

    เชื่อมต่อระหว่างบอร์ดกับเครื่องคอมพิวเตอร์ เพื่อใช้สำหรับโหลดโปรแกรม และจ่ายไฟให้กับบอร์ด
    
7. หลอดไฟแสดงสถานะ

    เมื่อมีต่อกับแหล่งจ่ายไฟ หรือขณะทำการโหลดโปรแกรม

8. ปุ่มรีเซท

    เราสามารถกดปุ่มรีเซท เพื่อให้โปรแกรมเริ่มทำงานใหม่อีกครั้ง

9. ช่องต่อไฟเลี้ยง

    ใช้เชื่อมต่อกับแหล่งจ่ายไฟขนาด 3 โวลต์

10. USB Inferface Chip

    เป็นชิพสำหรับควมคุมการเชื่อมต่อกับ USB ในการโหลดโค้ดลงบอร์ด

## เครื่องมือสำหรับเขียนโค้ด Microsoft MakeCode

**Microsoft MakeCode** เป็นเครื่องมือที่ถูกพัฒนาขึ้นมาสำหรับ **micro:bit** โดยรองรับการเขียนโค้ดทั้งในรูปแบบบล็อก (Block) ซึ่งจะคล้ายกับการต่อตัวต่อแบบลากวาง เหมาะสำหรับเด็กๆ ที่เริ่มต้นเขียนโค้ด และรองรับการเขียนโค้ดแบบข้อความ (Text-based) ซึ่งมีด้วยให้เลือกใช้ด้วยกัน 2 ภาษาเลยทีเดียว นั้นก็คือ **JavaScript** และ **Python**

![MakeCode](/assets/images/posts/2020/what-is-micro-bit/makecode.png)

สำหรับในบทความนี้ก็น่าจะทำให้เราเริ่มรู้จักกับ **micro:bit** และเครื่องมือสำหรับเขียนโค้ดกันไปแล้ว ในบทความหน้าเราจะมาลองมือเขียนโค้ด และรันโค้ดของเรากัน อย่าลืมรอติดตามกันนะครับ

## References
- [micro:bit](https://www.microbit.org)
- [MakeCode](https://makecode.microbit.org/)