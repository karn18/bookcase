---
layout: post
title: ลดเวลาตอบสนองของ REST API ด้วย Oj
description: ไม่น่าเชื่อว่าการเปลี่ยนมาใช้ Oj จะส่งผลให้เวลาตอบสอนงของ REST API นั้นดีขึ้นได้
  โดยการปรับแต่งไม่กี่ขั้นตอน
author: Karn
tags:
- rails
- api
- json
- oj
- jbuilder
categories: dev
cover: "/assets/images/posts/2021/improve-rest-api-response-time-with-oj/cover.png"
image:
  path: "/assets/images/posts/2021/improve-rest-api-response-time-with-oj/cover.png"
  width: 1200
  height: 800
date: 2021-12-20 10:21 +0700
---
เอาง่ายๆ เลยว่า ถ้าใครกำลังมองหาวิธีการลดเวลาตอบสนอง (Response Time) เมื่อมีการเรียกใช้ REST API บน **Rails** ลองมาใช้ gem ที่ชื่อว่า `oj` ในการสร้างหรือแปลง JSON แล้วกัน<!--more-->

## วิธีติดตั้ง
- เพิ่ม `gem "oj"` เข้าไปในไฟล์ Gemfile
- รันคำสั่งติดตั้ง `bundle install`
- ใส่คำสั่ง `Oj.optimize_rails()` เข้าไปในไฟล์ `config/application.rb` เพื่อเปลี่ยนให้ **Rails** เรียกใช้ gem `oj` แทน `json`

---

ย้อนกลับไปที่โปรเจ็ค[ระบบสารสนเทศเพื่อส่งต่อผู้ป่วย สำหรับหน่วยบริการในระบบหลักประกันสุขภาพถ้วนหน้า เขตพื้นที่กทม. (EHHC)](https://karn.work/projects/ehhc) เราได้พัฒนาเป็น REST API ไว้ให้แอพพลิเคชันหน้าบ้านเรียกใช้งาน ในตัวโปรเจ็คจะใช้ gem `json` ซึ่งเป็น **stdlib** ที่มากับ **Ruby** ในการจัดการ JSON ไม่ว่าจะสร้างหรือแปลงข้อมูลให้อยู่ในรูป JSON และดูเหมือนว่าเวลาตอบสนองที่ได้ออกมาค่อนข้างจะช้าไปหน่อย ประกอบกับเราต้องเตรียม REST API ไว้ให้ 3rd party ที่จะเข้ามาเรียกใช้เพิ่มอีก ด้วยโหลดที่จะเพิ่มขึ้นเราคงต้องหาวิธีเพิ่มประสิทธิภาพการทำงานของ server การเปลี่ยนตัวจัดการ JSON จึงเป็นจุดแรกที่น่าจะช่วยลดเวลาตอบสนองได้ดีที่สุด

แต่จากที่ได้อ่านหลายบทความ เช่น [1](https://www.mayerdan.com/ruby/2020/11/15/benchmarking-JSON-parser), [2](https://www.ohler.com/dev/oj_misc/performance_strict.html) ก็พบว่า `oj` น่าจะเป็นตัวเลือกที่ดีสำหรับเรา ดังนั้นเราจึงได้สร้าง API อย่างง่ายขึ้นมาทดสอบโดยให้มีการดึงข้อมูลคนจำนวน 1000 คน ซึ่งแต่ละคนจะมีข้อมูลชื่อ นามสกุล และเลขประชาชนจำลอง

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/migration_file.png){:width="400px"}
*Migration*

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/dummy_data.png)
*Create dummy data*

จากนั้นเราวัดประสิทธิภาพของ server ด้วย **Apache Benchmark (AB)** ซึ่งเราแบ่งการทดสอบเป็น 2 ชุด โดยแต่ละชุดเรากำหนดค่าคงที่ในของจำนวน request การดึงข้อมูลเท่ากับ 100 requests แต่มี concurrent ที่แตกต่างกันคือ 10 และ 5 

### Concurrent เท่ากับ 10

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/oj_n100_c10.png)
*Using oj N=100, C=10*

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/json_n100_c10.png)
*Using json N=100, C=10*

### Concurrent เท่ากับ 5

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/oj_n100_c5.png)
*Using oj N=100, C=5*

![](/assets/images/posts/2021/improve-rest-api-response-time-with-oj/json_n100_c5.png)
*Using json N=100, C=5*

เครื่องที่ใช้สำหรับทำเป็น Server คือ Macbook Pro (2019), CPU 2.6 GHz 6-Core Intel Core i7, RAM 32GB โดยผลลัพท์ที่ได้จะให้ผลแตกต่างกันขึ้นอยู่กับสเปคของ Server แต่จากผลลัพท์ที่ได้ก็พอจะสรุปได้ว่าการใช้งาน `oj` แทน `json` นั้นให้ผลที่ดีกว่าทั้งเรื่องของ RPM, เวลา และภาพรวมทั้งหมด

## References
- [oj](https://github.com/ohler55/oj)
- [jbuilder](https://github.com/rails/jbuilder)
- [Benchmarking JSON Parser](https://www.mayerdan.com/ruby/2020/11/15/benchmarking-JSON-parser)
- [Oj Strict Mode Performance](https://www.ohler.com/dev/oj_misc/performance_strict.html)
