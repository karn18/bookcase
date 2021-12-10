---
layout: post
title: Hotwired and Line Beacon
description: Hotwired มาใช้อัพเดตข้อมูลที่มาจาก Line Beacon มาประยุกต์ใช้กับกิจกรรม Rally กันดูหน่อยว่าจะออกมาเป็นอย่างไร
author: Karn
tags:
- rails
- hotwired
- line
- beacon
categories: dev
cover: "/assets/images/posts/2021/hotwired-and-line-beacon/cover.png"
image:
  path: "/assets/images/posts/2021/hotwired-and-line-beacon/cover.png"
  width: 1200
  height: 800
date: 2021-12-01 15:05 +0700
---
ช่วงนี้ใกล้จะเทศกาลคริสมาสต์แล้วก็จะมีการเปิดกล่องของขวัญกัน ดังนั้นในบทความนี้เราจะมาลองพัฒนา**แคมเปญเปิดกล่องของขวัญวันคริสมาสต์** โดยใช้ **Hotwired** และ **Line Beacon** กัน ทั้งนี้เพื่อเพิ่มความน่าสนใจในการเข้าถึงลูกค้าผ่าน **Line OA**

## ไอเดีย

![](/assets/images/posts/2021/hotwired-and-line-beacon/scenario.png){:width="600px"}
*Scenario*

ก่อนอื่นเราก็ต้องมี **Line OA** ก่อน จากนั้นเราก็เชื่อมต่อ beacon เข้ากับ **Line OA** ของเราที่จะใช้งาน ส่วนสำคัญที่ต้องทำต่อคือการสร้าง **Line Messaging API** ไว้สำหรับจัดการ Webhook เมื่อได้รับสัญญาณ beacon และสร้าง **Line Login** ไว้สำหรับ **LIFF** ในการเปิดกล่องของขวัญ

สำหรับในฝั่งของ **Rails** เราจะใช้ **Hotwired** ในการ interact กับหน้าเว็บแบบ realtime ดังนั้นสิ่งที่ต้องสร้างเข้าไปในหน้าเว็บของเราคือการเพิ่ม `turbo_stream_from` เข้าไปในหน้า dashboard เพื่อเปิดช่องทาง Web Socket สำหรับให้ server สามารถส่งข้อมูลมายัง client ได้

ในช่องการแสดงผลที่จะอัพเดตเราจะใช้ `turbo_frame_tag` สำหรับแสดงข้อมูลผู้ใช้งานที่ต่อกับ beacon และแสดงข้อมูลผู้ใช้งานที่ได้กดเปิดกล่องของขวัญ

```erb
<main>
  <%= turbo_stream_from "my_dashboard" %>
  <div class="flex">
    <div class="w-full px-4 lg: w-1/2">
      <h1 class="p-4 text-lg font-bold">Beacon: #<%= @beacon.name %></h1>
      <%= turbo_frame_tag "notifications", class: "my-6" do %>
        <%= render @notifications %>
      <% end %>
    </div>
    <div class="w-full px-4 lg:w-1/2">
      <h1 class="p-4 text-lg font-bold">Lucky Box</h1>
      <%= turbo_frame_tag "boxes", class: "my-6" do %>
        <%= render @boxes %>
      <% end %>
    </div>
  </div>
</main>
```

จากขั้นตอนเมื่อระบบได้รับ Webhook เมื่อมี beacon ต่อเข้ามาแล้ว จะทำการสร้างโมเดลเก็บเอาไว้ และทันทีหลังจากที่ข้อมูลถูกบันทึก เราจะทำการ broadcast ส่ง HTML กลับไปยังหน้าเว็บผ่าน Web Socket ผ่าน `broadcast_prepend_to`

```rb
# app/models/notification.rb
after_create_commit :broadcast_create_later
def broadcast_create_later
  broadcast_prepend_to "my_dashboard", target: "notifications"
end
```

## ผลลัพท์การพัฒนา

{% raw %}
<div class="my-8">
  <video controls playsinline>
    <source src="/assets/videos/hotwired_and_line_beacon.mov" type="video/mp4">
  </video>
</div>
{% endraw %}

![](/assets/images/posts/2021/hotwired-and-line-beacon/screenshot_1.png){:width="600px"}
*Alpha*

![](/assets/images/posts/2021/hotwired-and-line-beacon/screenshot_2.png){:width="600px"}
*Unbox with Line LIFF*

## References
- [Hotwired](https://hotwired.dev/)
- [Line Beacon](https://developers.line.biz/en/docs/messaging-api/using-beacons/)
