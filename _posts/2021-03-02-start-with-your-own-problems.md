---
layout: post
title: เริ่มต้นจากปัญหาของตัวเอง
author: Karn
tags:
- ruby
- rails
- hotwire
categories: dev
date: 2021-03-02 21:44 +0700
---
เริ่มต้นจากปัญหาของตัวเองที่เวลาจะลางานในช่วงปลายปี จะมีคำถามเกิดขึ้นมาว่า **"เอ๊ะ ตอนนี้ยังเหลือวันลาพักร้อนอยู่กี่วันแล้วเนี่ย"** ทำให้ต้องไปสอบถามทาง HR บ้าง หรือนับรวมวันที่ลาจาก email ที่ส่ง ทำให้เกิดไอเดียที่จะพัฒนาโปรแกรมใบลาขึ้นมา<!--more-->

นอกจากนี้ก็อยากให้น้องๆ ในทีมได้ทดลองใช้ [Hotwire](https://hotwire.dev/) จริงๆ ในโปรแกรมด้วย ทำให้เริ่มต้นออกแบบการไหลของโปรแกรม (Flow) สร้างแบบจำลองหน้าตาโปรแกรม (UI Mockup) จนเริ่มพัฒนาจนได้เวอร์ชันแรกออกมา ทั้งนี้ในการหยิบเลือกฟีเจอร์การทำงานของโปรแกรม ทางทีมได้เลือกเอาเฉพาะที่จำเป็นต้องใช้ขึ้นมาพัฒนาก่อน (MVP) อย่างน้อยก็เพื่อให้สามารถพิสูจน์ว่าเทคโนโลยีที่นำมาใช้สามารถที่จะนำไปใช้จริงในชิ้นงานที่ใหญ่ขึ้นได้ และเราต้องการให้โปรแกรมของเราสามารถใช้จริงได้เร็วที่สุด

![app1](/assets/images/posts/2021/start-with-your-own-problems/app1.png){:width="600px"}
*หน้าเข้าสู่ระบบ*

![app2](/assets/images/posts/2021/start-with-your-own-problems/app2.png){:width="600px"}
*หน้าปฏิทิน*

![app3](/assets/images/posts/2021/start-with-your-own-problems/app3.png){:width="600px"}
*หน้าสรุปการลา*

![app4](/assets/images/posts/2021/start-with-your-own-problems/app4.png){:width="600px"}
*หน้าสร้างใบลา*

![mobile1](/assets/images/posts/2021/start-with-your-own-problems/mobile1.png){:width="400px"}
*หน้าแรกบนมือถือ*

![mobile2](/assets/images/posts/2021/start-with-your-own-problems/mobile2.png){:width="400px"}
*หน้าสร้างใบลาบนมือถือ*

> ลองมองหาสิ่งที่เป็นปัญหา และเริ่มต้นแก้ไขปัญหาทีละนิด เชื่อเถอะว่าคุณไม่ได้เจอปัญหาดังกล่าวนั้นเพียงคนเดียว สุดท้ายแล้วคุณก็จะได้โปรแกรมที่ตอบโจทย์ทั้งตัวเอง และผู้อื่นด้วย