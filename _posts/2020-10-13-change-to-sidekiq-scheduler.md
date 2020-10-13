---
layout: post
title: เปลี่ยนมาใช้ Sidekiq Scheduler ดีกว่า
author: Karn
tags:
- ruby
categories: dev
date: 2020-10-13 12:10 +0700
---
สำหรับงานที่ถูกเรียกใช้งานเมื่อถึงกำหนดเวลา หรือถูกปลุกขึ้นมาทำงานเมื่อถึงรอบเวลาที่เรียกว่า **Scheduler** มีประโยชน์อย่างมากสำหรับการจัดการเหตุการณ์ที่ไม่ต้องตอบสนองกับผู้ใช้งานทันทีทันใด ยกตัวอย่างเช่น

- การส่ง **email** แจ้งเตือนเมื่อถึงรอบเวลา
- การประมวลผลข้อมูลที่ใช้เวลานาน
- การออกรายงาน **PDF** ในแต่ละเดือน

ถ้าเป็นใน **Unix** เราก็คงจะคุ้นชินกับการเรียกใช้ `crontab` สำหรับ **Ruby** เองก็จะใช้ **gem** ที่มีความสามารถเช่นเดียวกัน นั้นก็คือ **rufus-scheduler** ซึ่งปัญหาที่ผมและทีมเจอก็คือการนำ **rufus-scheduler** มาใช้กับ **Rails Application** ไม่ถูกวิธีจึงทำให้เกิดปัญหาการเรียกใช้งาน และสร้างข้อมูลซ้ำ รวมไปถึงการส่ง **email** ไปยังลูกค้าซ้ำซ้อน โดยเคสปัญหาเกิดขึ้นดังนี้

- สร้าง `config/initializers/scheduler.rb` ซึ่งเป็นไฟล์ **initializer** ไว้สำหรับรันงานตามกำหนดเวลา และจะทำงานทันทีที่โปรแกรมทำงาน

## config/initializers/scheduler.rb

```ruby
require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new
scheduler.cron '0 0 * * *' do
  # Send emails
  UserMailer.notify.deliver_later
end
```

จากค่าที่กำหนดไว้ข้างต้นจะกำหนดให้ทุกๆ เที่ยงคืนจะส่ง **email** แจ้งเตือนไปยังผู้ใช้งาน

**เอ๊ะ!!!** ดูแล้วก็ไม่น่าจะมีประเด็นปัญหาอะไรนิ ใช่แล้วหละครับในกรณีที่เรารันแอพไว้เพียง 1 instance ก็จะไม่เกิดปัญหาอะไร ทีนี้ลองมานึกภาพตามผมกันดู 

ถ้าเกิดว่าแอพของเราจำเป็นต้องมีการขยายให้รันได้ 2 instance หรือมากกว่านั้นเพื่อรับโหลดที่มากขึ้น ปัญหาการใช้งาน **Scheduler** แบบวิธีข้างต้นก็จะสร้างปัญหาขึ้นมาทันที ซึ่งก็คือแต่ละ instance จะทำการเหมือนกันเมื่อถึงเวลาเที่ยงคืน และจะทำการส่ง **email** ไปหาลูกค้า ทำให้แทนที่ลูกค้าคนหนึงควรจะได้รับ **email** เพียงฉบับเดียกลับกลายเป็นหลายฉบับ

![issue1](/assets/images/posts/2020/change-to-sidekiq-scheduler/issue.png){:width="600px"}
*email จะถูกส่งซ้ำ เมื่อแอพรัน 2 instance*

ที่นี้มองเห็นปัญหาแล้วใช่มั้ยครับ สำหรับวิธีแก้ไขปัญหาก็เพียงเปลี่ยนมาใช้ **Sidekiq Scheduler** ซึ่งเป็น **extension** หนึ่งของ **Sidekiq** อยู่แล้ว อันที่จริงแล้วในตัวโปรแกรมเราก็ใช้ **Sidekiq** เป็นตัวจัดการงานที่เป็น **Background Job** ต่างๆ อยู่แล้ว ดังนั้นการย้ายงานในส่วนของ **Scheduler** ให้มาทำที่ตรงนี้ก็น่าจะเป็นจุดที่เหมาะสมที่สุด และที่สำคัญคือ **Sidekiq** จะถูกสร้างขึ้นมาเพียง 1 instance ซึ่งทำให้ไม่เกิดการทำงานซ้ำซ้อนที่เกิดขึ้นอย่างแน่นอน

![approach](/assets/images/posts/2020/change-to-sidekiq-scheduler/approach.png){:width="460px"}
*ใช้ Sidekiq Scheduler แทน*

## config/sidekiq.yml

```yaml
:schedule:
  send_email:
    cron: '0 0 * * *'
    class: UserMailer
```

## References
- [Sidekiq Scheduler](https://github.com/Moove-it/sidekiq-scheduler)
- [Rufus Scheduler](https://github.com/jmettraux/rufus-scheduler)
