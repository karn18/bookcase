---
layout: post
title: เพิ่มฟิลด์ใหักับ nested attributes แบบ dynamic ด้วย stimulus
author: Karn
tags:
- rails
- stimulus
categories: dev
cover: "/assets/images/posts/2020/เพิ่มฟิลด์ใหักับ-nested-attributes-แบบ-dynamic-ด้วย-stimulus/cover.png"
image:
  path: "/assets/images/posts/2020/เพิ่มฟิลด์ใหักับ-nested-attributes-แบบ-dynamic-ด้วย-stimulus/cover.png"
  height: 100
  width: 100
date: 2020-08-17 09:46 +0700
---
💡 ได้กลับมาแก้โปรเจคเก่าที่มีการใช้งาน **Nested Attributes** ก็ปรากฏว่ามันมีบัคในส่วนของการกดเพิ่มฟิลด์ให้กับ **Nested Attributes** ซึ่งพอมานั่งคิดๆ วิเคราะห์ดูถ้าตอนนั้นได้รู้จักกับ **Stimulus** และนำมาใช้ในโปรเจคก็คงจะช่วยให้พัฒนาได้ง่าย และรวดเร็วขึ้น<!-- more -->

สำหรับโจทย์ในวันนนี้จะเป็นการบันทึกข้อมูลหนังสือ โดยหนังสือหนึ่งเล่มสามารถมีผู้แต่งได้หลายคน ซึ่งฟอร์มในการบันทึกจะทำการสร้างหนังสือ และรายชื่อผู้แต่งไปพร้อมๆ กัน

- เริ่มต้นจากการสร้างโมเดล **Book** และ **Author**

- กำหนดคุณสมบัติของ **Book** ให้สามารถรับ **Nested Attributes** ของ **Author**

```ruby
class Book < ActiveRecord::Base
  has_many :authors

  accepts_nested_attributes_for :authors, reject_if: :all_blank, allow_destroy: true
end
```

> โมเดล **Author** จะถูกสร้างก็ต่อเมื่อค่าที่ส่งเข้ามาต้องไม่เป็นค่าว่าง และอนุญาตให้ลบข้อมูลได้ผ่าน attribute ที่ชื่อ _destroy

- สร้าง **template** ไว้สำหรับเพิ่ม **Author** ในฟอร์มของ **Book** เพื่อให้ **Stimulus Controller** เรียกใช้


## app/views/books/_form.html.erb

```erb
  <h2>Authors:</h2>
  <div class="authors" data-controller="nested">
    <template data-target="nested.template">
      <%= render 'authors/form', model: Author.new, form: form, child_index: 'NEXT_ID' %>
    </template>

    <div data-target="nested.parent">
      <%= render 'authors/form', model: nil, form: form, child_index: nil %>
    </div>
    <%= link_to "Add Author", "#", data: { action: "nested#add_associate" }, class: "btn" %>
  </div>
```

> จะสังเกตเห็นได้ว่ามีการใช้ <template /> ในการเก็บแม่แบบสำหรับการสร้างฟอร์มแบบ dynamic

- สร้าง **Stimulus Controller** ในการเพิ่มฟิลด์ของ **Author** แบบ dynamic

## app/javascripts/controllers/nested_controller.js

```javascript
import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "template", "parent" ]

  add_associate(event) {
    event.preventDefault()

    var content = this.templateTarget.innerHTML.replace(/NEXT_ID/g, new Date().getTime())
    this.parentTarget.insertAdjacentHTML('beforeend', content)
  }
}
```

> ทันทีที่เกิดเหตุการณ์ `add_associate` โปรแกรมจะทำการดึงฟอร์มแม่แบบที่จะสร้างขึ้นมาและแทนที่ข้อความ `NEXT_ID` ด้วย timestamp และนำไปใส่เพิ่มในจุดที่ระบุไว้

- ปรับแก้ไขฟอร์มสำหรับการสร้าง **Author**

## app/views/authors/_form.html.erb

```erb
  <%= form.fields_for :authors, model, child_index: child_index, class: "-form" do |author_fields|%>
    <div class="form-group">
      <%= author_fields.label :full_name, class: "form-label col-2" %>
      <%= author_fields.text_field :full_name, class: "form-input col-7" %>
      <label class="form-checkbox col-2 mx-2">
        <%= author_fields.check_box :_destroy, class: "form-checkbox" %>
        <i class="form-icon"></i> Delete
      </label>
    </div>
  <% end %>
```

- ทดสอบผลลัพท์กันดู

![ตัวอย่าง](/assets/images/posts/2020/เพิ่มฟิลด์ใหักับ-nested-attributes-แบบ-dynamic-ด้วย-stimulus/example.gif)

## References
- [https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html](https://api.rubyonrails.org/classes/ActiveRecord/NestedAttributes/ClassMethods.html)
- [https://www.driftingruby.com/episodes/nested-forms-from-scratch-with-stimulusjs](https://www.driftingruby.com/episodes/nested-forms-from-scratch-with-stimulusjs)
