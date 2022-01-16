---
layout: post
title: PostgreSQL ตึงจัดกิน CPU ไปจนหมด
description: เมื่อ Server ที่ให้บริการเว็บแอพพลิเคชันเกิดอาการนิ่งไม่ตอบสนอง และเมื่อตรวจสอบเบื้องต้นพบว่า
  PostgreSQL ได้กิน CPU ไป 100% จนไม่เหลือให้ Process อื่นๆ ได้ทำงานอีกต่อไป แล้วเราจะรู้ได้อย่างไรหละว่า
  Query ไหนที่ใช้เวลา และกิน CPU ไปลองมาดูกัน
author: Karn
tags:
- rails
- postgresql
- LFP
categories: dev
cover: "/assets/images/posts/2022/high-cpu-usage-from-postgresql/cover.png"
image:
  path: "/assets/images/posts/2022/high-cpu-usage-from-postgresql/cover.png"
  width: 1200
  height: 800
date: 2022-01-16 14:42 +0700
---
เปิดปีใหม่ก็ได้พบกับประสบกรณ์ตื่นเต้นทันที เมื่อได้รับแจ้งว่าเว็บ[ระบบสารสนเทศเปรียบเทียบวัดระดับคุณภาพโรงพยาบาล](https://karn.work/projects/thip) เกิดอาการค้างไม่ตอบสนองผู้ใช้งาน หลังจากได้เข้าไปตรวจสอบเบื้องต้นก็พบว่า เห้ย! CPU ของเครื่อง Server กินไป 100% โดย **PostgreSQL**

![](/assets/images/posts/2022/high-cpu-usage-from-postgresql/htop.png){:width="600px"}
*htop ดูการใช้งาน CPU*

ด้วยความที่เราก็ไม่ได้เชี่ยวชาญ **PostgreSQL** สิ่งแรกที่ต้องตรวจสอบก่อนก็คือ Query ใดที่ทำให้ CPU ขึ้นถึง 100% ซึ่ง **PostgreSQL** มีโมดูลที่ใช้มอนิเตอร์และตรวจสอบ Query อยู่แล้วนั้นก็คือ `pg_stat_statements` แต่โดยปกติจะถูกปิดเอาไว้ตั้งแต่ต้น ดังนั้นเราจะต้องทำการเปิดโมดูลดังกล่าวก่อน[ตามนี้](https://dbaclass.com/article/monitor-sql-queries-in-postgres-using-pg_stat_statements/)

จากนั้นก็ค้นหา Query ที่ใช้น่าจะเป็นปัญหาโดยใช้คำสั่ง

```sql
$ SELECT 
  (total_time / 1000 / 60) as total, 
  (total_time/calls) as avg, 
  query 
FROM pg_stat_statements 
ORDER BY 1 DESC 
LIMIT 5;

$ SELECT
  max_exec_time,
  query
FROM pg_stat_statements
ORDER BY max_exec_time DESC
LIMIT 5;
```

ถ้าจะย้อนกลับไปอีกนิดหนึ่งก่อนที่เราจะมอนิเตอร์ Query เราได้ทำการตรวจสอบขั้นตอนการใช้งานของโปรแกรมเราด้วยที่มีการเรียกใช้งาน Query ซึ่งก็พบว่าปัญหาเกิดขึ้นในหน้า Dashboard ซึ่งจะแสดงรายงานกราฟจำนวนมาก โดย Query ที่ถูกเรียกใช้ในหน้านี้จะมีจำนวนเท่ากับจำนวน KPI ที่ผู้ใช้งานเลือกคูณด้วย 2 เพราะแต่ละ KPI จะแสดงกราฟออกมา 2 ตัว สมมติว่าผู้ใช้งานต้องการแสดง KPI 10 ตัวนั้นหมายความว่าจะมีการเรียก Query ไปที่ **PostgreSQL** พร้อมๆ กัน 20 ตัวเลยทีเดียว

![](/assets/images/posts/2022/high-cpu-usage-from-postgresql/dashboard.png){:width="600px"}
*Dashboard*

ดังนั้นเพื่อช่วยลดโหลดทำการทำงานของ **PostgreSQL** ที่ต้อง Query ข้อมูลจำนวนมากในเวลาเดียวกัน เราจึงได้ใช้ประโยชน์จากบทความ[Lazy Loading](https://world.hey.com/karn/lazy-loading-0a6d43f5) เข้ามาช่วยในการ Query ข้อมูลเมื่อกราฟถูกเลื่อนขึ้นมาแสดงใน viewport

ทั้งนี้ทั้งนั้นต้นเหตุของปัญหาจริงๆ ก็คือ Quey ที่กินทั้ง CPU และใช้เวลาในการดึงข้อมูลที่นาน ดังนั้น**วิธีเดียว**ที่จะแก้ปํญหาได้จริงๆ ก็คือจัดการกับ Query เจ้าปัญหานั้นเอง

## References
- [pg_stat_statements](https://www.postgresql.org/docs/current/pgstatstatements.html)
- [Lazy Loading](https://world.hey.com/karn/lazy-loading-0a6d43f5)
