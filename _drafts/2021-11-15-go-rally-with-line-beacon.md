---
layout: post
title: กิจกรรม Rally กับ Line Beacon
description: มาลองเอา Line Beacon มาประยุกต์ใช้กับกิจกรรม Rally กันดูหน่อยว่าจะออกมาเป็นอย่างไร
author: Karn
tags:
- rails
- hotwired
- line
- beacon
categories: dev
date: 2021-11-15 22:24 +0700
---
ถ้าจะให้นึก usecase ที่จะนำ Line Beacon มาประยุกต์ใช้ในแบบอื่นๆ นอกเหนือจากการตอบข้อความกลับไปหาผู้ใช้งานแบบตรงๆ ผ่าน Bot เมื่อมือถือเข้าไปอยู่ในรัศมีของ Beacon เท่าที่นึกออกในตอนนี้ก็คงเอาใช้กับกิจกรรม rally หรือ team building หละมั้ง เดี่ยวลองมาลองคิดและพัฒนากันดู<!--more-->

## Flow

![flow_1](/assets/images/posts/2021/go-rally-with-line-beacon/flow_1.png){:width="600px"}
*flow 1*

สำหรับ flow คร่าวๆ ที่จะเกิดขึ้นจะก็ประมาณนี้
  1. เราจะใช้ Rich Menu เพื่อให้ผู้ร่วมเข้าแข่งขันกด Start เพื่อให้ระบบเริ่มทำการจับเวลา
  2. เมื่อผู้แข่งขันเดินทางเข้าใกล้จุดเช็คพอยต์จะมีคำใบ้ หรือกิจกรรมที่ต้องทำในแต่ละเช็คพอยท์ส่งไปยังผู้เข้าแข่งขัน และในเวลาเดียวกันหน้าจอ Dashboard ก็จะมีการแจ้งเตือนขึ้นมาให้ผู้จัดรับทราบได้ด้วย

![flow_2](/assets/images/posts/2021/go-rally-with-line-beacon/flow_2.png){:width="600px"}
*flow 2*

   3. หลังจากที่ผู้เข้าแข่งขันทำกิจกรรมในเช็คพอยท์เสร็จสิ้น ผู้จัดสามารถส่งสถานที่ถัดไปเพื่อให้ผู้เข้าร่วมไปเดินทางไปทำกิจกรรมต่อๆ ไป
   4. เมื่อผู้แข่งขันเดินทางไปยังจุดเส้นชัย ก็ให้ผู้เข้าร่วมกดปุ่ม Finish ที่ Rich Menu เพื่อส่งข้อมูลไปเวลา และแสดงผลไปยัง Dashboard


## สิ่งที่เราจะพัฒนา
1. Rich Menu 
2. Bot สำหรับตอบกลับข้อความจาก Rich Menu และ Beacon
3. เว็บสำหรับแสดงผล โดยจะแสดงเวลาที่ผู้แข่งขันเริ่ม Start, Finish และแจ้งเตือนเมื่อมีผู้ร่วมเข้าแข่งขันเข้ามายังจุดเช็คพอยต์ต่างๆ

{% raw %}
<div class="my-8">
  <video controls playsinline>
    <source src="/assets/videos/go_rally.mov" type="video/mp4">
  </video>
</div>
{% endraw %}

## References
- [Line Beacon](https://developers.line.biz/en/docs/messaging-api/using-beacons/)
  