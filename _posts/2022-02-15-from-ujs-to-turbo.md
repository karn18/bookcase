---
layout: post
title: เปลี่ยน UJS มาเป็น Turbo
description: จาก Unobtructive JavaScript หรีอ UJS ที่ใช้กันมาเนิ่นนาน เปลี่ยนมาใช้ Turbo แทนจะเป็นอย่างไรกันบ้าง
author: Karn
tags:
- rails
- ujs
- turbostream
categories: dev
date: 2022-02-15 13:17 +0700
---
ปกติแล้วในการจัดการกับ frontend ของโปรแกรมต่างๆ เราจะใช้ **[Unobtructive JavaScript (UJS)](https://guides.rubyonrails.org/working_with_javascript_in_rails.html#unobtrusive-javascript)** ซึ่งเป็นเทคนิคที่ **Rails** นำเสนอขึ้นมาเพื่อใช้จัดการกับ JavaScript และ DOM ในการแสดงผล ด้วยเทคนิคดังกล่าวก็จะทำให้เราเขียนโค้ด **JavaScript** ที่ฝั่งหลังบ้าน และส่งไปรันที่หน้าบ้านได้

แต่ด้วยการมาของ **Turbo** ทำให้รูปแบบการแสดงผลทำได้ง่ายขึ้น และใช้การเขียน **HTML** ปกติแทน **JavaScript** ซึ่งก็ดูจะ clean กว่าเดิมมาก ดังนั้นเราจึงได้ทำการเปลี่ยนจาก **UJS** มาเป็น **Turbo** ร่วมกับ **Stimulus** สำหรับแนวทางการปรับเปลี่ยนสามารถศึกษาได้จาก[ที่นี้](https://github.com/hotwired/turbo-rails/blob/main/UPGRADING.md)

ในมุมของการปรับแก้ไขโค้ดต้องบอกเลยว่าโค้ดของ **controllers** และ **routes** ไม่ต้องปรับเปลี่ยนอะไรเลย เราสามารถใช้โค้ดเดิมได้ แต่สิ่งที่เราต้องแก้ก็มีเพียงแค่โค้ดใน **views** เท่านั้น ในบทความนี้จะยกตัวอย่างที่เราแก้ไขมาให้ดู โดยจะเป็นการกดปุ่มเพื่อเปิดดึงข้อมูลมาแสดงบนกล่องแสดงข้อความแบบ Modal

{% raw %}
<video controls playsinline>
  <source src="/assets/videos/turbo.mov" type="video/mp4">
</video>
{% endraw %}

> ‼️ ด้วยตัวอย่างทั้งสองแบบมีการใช้ CSS กันคนละตัวอาจจะมีทำให้สับสนกันบ้างนะครับ ‼️

```erb
<!-- app/views/invoices/index.html (UJS) -->
<!-- link_to ที่กำหนดให้ remote เป็น true -->
<%= link_to [invoice, 'info'], remote: true do %>
  <i class="info <%= 'inactive' unless invoice.audit_logs.present? %> icon"></i>
<% end %>

<!-- Modal -->
<div class="ui modal" id="modal">
  <div class="header"><%= t('invoice.info_label') %></div>
  <div id="invoice_info_content" class="content">
  </div>
</div>
```

```erb
<!-- app/views/invoices/info.js.erb -->
$("#invoice_info_content").html("<%= j render 'info', invoice: @invoice %>");
$('#invoice_info_modal').modal('show');
```

เมื่อใช้ **UJS** เราจะกำหนดค่า remote เป็น true ให้กับ link_to เพื่อบอกให้รู้ว่าเมื่อมีการกดปุ่มจะเรียก ajax request ไปยังหลังบ้าน และนำค่ามาแสดงซึ่งหลังบ้านเราจะเขียนเป็นโค้ด **JavaScript** เพื่อสั่งให้แสดง **HTML** ของ info และเรียกให้ Modal แสดงขึ้นมา จะสังเกตุเห็นนามสกุลของไฟล์เป็น `.js.erb`

```erb
<!-- app/views/invoices/index.html (Turbo) -->
<!-- button ที่ีกำหนดค่าด้วย stimulus -->
<button data-action="click->fetch#info click->modal#open" class="self-center">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6<%= ' text-red-400' if invoice.audit_logs.present? %>" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
</button>

<!-- Modal -->
<div data-modal-target="container" data-action="click->modal#closeBackground keyup@window->modal#closeWithKeyboard" class="w-screen h-screen absolute hidden z-[100]">
    <div id="modal-bg" class="w-screen h-screen bg-gray-100 opacity-70 absolute"></div>
    <%= turbo_frame_tag "modal", "data-modal-default-content": true do %>
      <div id="modal-box" class="w-1/3 flex flex-col gap-2 -translate-y-1/2 p-6 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute border shadow-md">
        <%= image_tag 'default_loading.gif', class: "w-12 mx-auto" %>
      </div> %>
    <% end %>
  </div>
```

```erb
<!-- app/views/invoices/info.turbo_strea.erb -->
<%= turbo_stream.replace "modal" do %>
  <%= turbo_frame_tag "modal" do %>
    <div id="modal-box" class="w-1/3 flex flex-col gap-2 -translate-y-1/2 p-6 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute border shadow-md">
      ...
    </div>
  <% end %>
<% end %>
```

หลังจากปรับมาใช้ **Turbo** แน่นอนว่าเราจะต้องใช้งานคู่กับ **Stimulus** ซึ่งเราใช้งาน **Controller** 2 ตัวร่วมกันคือ

1. `ModalController` เพื่อใช้สำหรับการจัดการ Modal
2. `FetchController` เพื่อใช้สำหรับดึงข้อมูลจากหลังบ้านมาแสดงผ่าน **TurboStream**
   
ในส่วนของ Modal เราก็จะใส่ **TurboFrame** เพื่อใช้แสดงผลต่างๆ ที่มาจากหลังบ้านซึ่งมาในรูปของ **TurboStream** จะสังเกตุได้จากนามสกุลของไฟล์ที่เป็น `.turbo_stream.erb`

อย่างไรก็ตามทั้ง 2 วิธีให้ผลลัพธ์ที่ไม่แตกต่างกัน แต่ **Turbo** จะทำให้เรารู้สึกไม่ต้องเขียนโค้ด **JavaScript** และทำให้เราโฟกัสที่โค้ด **Ruby** และโลจิกที่จะให้เกิดขึ้นมากกว่า

ต้องยอมรับว่าในบางโปรเจ็คการเปลี่ยน **UJS** มาเป็น **Turbo** นั้นก็คงไม่ง่าย ดังน้นเราสามารถใช้ [MRUJS](https://mrujs.com/) ซึ่งเป็นเหมือนสะพานให้เรายังคงใช้งาน **USJ** ได้อยู่กับ **Rails 7** ซึ่งก็ได้มีโอกาสเข้าไปทดลองใช้ และสามารถใช้งานได้อย่างราบรื่นเลยทีเดียว
