---
layout: post
title: ส่งผ่าน HTML ไปยังแอพด้วย Turbo
author: Karn
tags:
- ruby
- rails
- turbo
categories: dev
cover: "/assets/images/posts/2020/html-over-with-turbo/cover.png"
image:
  path: "/assets/images/posts/2020/html-over-with-turbo/cover.png"
  width: 1200
  height: 630
date: 2020-12-28 11:14 +0700
---
## Turbo
เป็นอีกเทคนิค และเครื่องมือหนึ่งที่ถูกพัฒนาออกมาเพื่อเพิ่มความเร็วให้กับเว็บของเราในขณะที่ submit form โดยแบ่งความซับซ้อนในหน้าเว็บออกเป็นคอมโพเนนต์เช่นเดียวกับการเขียนแบบ SPA และนอกจากนี้ยังสามารถสตรีม partial page ผ่าน Websocket โดยที่เราไม่จำเป็นต้องเขียน JavaScript เลย<!--more-->

สามารถเข้าไปศึกษาวิธีการใช้ **Turbo** ได้จาก[ที่นี่](https://turbo.hotwire.dev) หรือจะดูจากวิดีโอด้านล่างก็ได้นะครับ

{% raw %}
<video controls playsinline>
  <source src="https://s3.amazonaws.com/hotwire.dev/hotwire-screencast.mp4" type="video/mp4">
</video>
{% endraw %}

---
> โดยส่วนตัวนั้นต้องบอกเลยว่าชอบเทคนิคอันนี้มาก เนื่องจากโดยส่วนตัวไม่ชอบการเขียน JavaScript และเลือกที่จะใช้ HTML มากกว่าการจัดการกับ JSON

ในบทความนี้จะมาลองพัฒนาแอพ Todo โดยใช้ความสามารถของ **Turbo** กัน มาดูโจทย์ของเรากันก่อนเลย
- แอพจะมีโมเดล `Task` ในการเก็บบันทึกสิ่งที่จะทำ (`name:string`) และ flag สำหรับระบุว่างานนั้นๆ ทำเสร็จแล้วหรือยัง (`done:boolean`)
- แอพจะมีเพียงหน้าเดียว แบบเดียวกับ SPA โดยแยกออกเป็น 2 ส่วนคือ
  1. ฟอร์มสำหรับบันทึก `Task` ซึ่งจะใช้ร่วมกันไม่ว่าจะเป็นการสร้างข้อมูลใหม่ หรือแก้ไขของเดิม
  2. ส่วนของการแสดงผล `Task` ทั้งหมดที่มีการสร้างขึ้นทั้งหมด (Task List)
  3. Task หนึ่งๆ ที่แสดงผลจะมีปุ่มสำหรับคลิกเพื่อแก้ไข (Edit) ปุ่มสำหรับเช็คว่างานนั้นทำเสร็จแล้ว (Done) และปุ่มสำหรับลบ (Delete)
- แอพสามารถ sync ข้อมูลอัตโนมัติ ไม่ว่าเราจะเปิดหน้าเว็บไว้กี่ tab ก็ตามผ่าน Websocket
- ใช้ **Bulma** เพื่อเพิ่มความสวยงาม

  ![compnents](/assets/images/posts/2020/html-over-with-turbo/components.png)

## มาลงมือกันเลย
- สร้างแอพใหม่ขึ้นมากันก่อน


  ```bash
  $ rails new awesome_todo
  ```

- เพิ่ม gem `hotwire-rails` เข้าไปยัง Gemfile

    ❗️ ที่ใช้เลือกใช้ `hotwire-rails` นั้นเพราะในแอพต้องการใช้ความสามารถของ `Stimulus` ด้วยดังนั้นจึงเลือกใช้ gem ตัวนี้ แต่ถ้าต้องการใช้ `Turbo` เพียงอย่างเดียว เราสามารถเลือกติดตั้ง `turbo-rails` แทนได้

  ```ruby
  # gem 'turbo-rails'
  gem 'hotwire-rails'
  ```

- ติดตั้ง gem และ dependency ของ `Turbo`

  ```bash
  $ bundle install
  # $ rails turbo:install
  $ rails hotwire:install
  ```


    คำสั่งข้างต้นจะติดตั้งส่วนที่จำเป็นให้กับแอพของเรา ไม่ว่าจะเป็น config สำหรับ `Action Cable`, include tag ใน layout และ JavaScript ที่ใช้งาน


- คอมเมนต์ `require("turbolinks").start()` ใน `app/javascript/packs/application.js`
- ตรวจสอบค่าการเชื่อมต่อกับฐานข้อมูลที่จะใช้งาน
- ติดตั้ง **Bulma CSS**
- สร้างโมเดล `Task`

  ```bash
  $ rails g scaffold Task name:string done:boolean
  ```

- เริ่มแก้ไขหน้า `index` (`/app/views/tasks/index.html.erb`) ให้มีคอมโพเนนต์ตามที่กำหนดไว้ คือ ส่วนแรกแสดงฟอร์มในการบันทึก และส่วนที่สองแสดงรายการสิ่งที่จะทำ โดยแต่ละส่วนจะถูกครอบด้วย `Turbo Frame` :new_task และ :tasks ตามลำดับ

  ```html
  <main class="container">
    <section class="section">
      <h1 class="title">Todo</h1>

      <%= turbo_frame_tag :new_task do %>
        <%= render 'form', task: @task %>
      <% end %>

      <div class="box mt-2 mb-2">
        <%= turbo_frame_tag :tasks do %>
          <%= render @tasks %>
        <% end %>
      </div>
    </section>
  </main>
  ```

- แก้ไข action `index` ใน `app/controllers/tasks_controller.rb`

  ```ruby
  def index
    @tasks = Task.all
    @task = Task.new
  end
  ```

- แก้ไข form สำหรับการบันทึกและแก้ไขข้อมูลใน `app/views/tasks/_form.html.erb`
  
  ```html
  <%= form_with(model: task, local: true) do |form| %>
    <% if task.errors.any? %>
      <div id="error_explanation">
        <h2><%= pluralize(task.errors.count, "error") %> prohibited this task from being saved:</h2>

        <ul>
          <% task.errors.full_messages.each do |message| %>
            <li><%= message %></li>
          <% end %>
        </ul>
      </div>
    <% end %>
    <div class="field has-addons">
      <p class="control">
        <%= form.text_field :name, class: "input", placeholder: "สิ่งที่จะทำ" %>
      </p>
      <p class="control">
        <%= form.submit "บันทึก", class: "button is-primary" %>
      </p>
    </div>
  <% end %>
  ```

- แก้ไข action `create` ใน `app/controllers/tasks_controller.rb` เพื่อใช้ในการบันทึกสิ่งที่จะทำใหม่

  ```ruby
  def create
    @task = Task.create!(task_params)
  end
  ```

- เพิ่ม action `done` ใน `app/controllers/tasks_controller.rb` เพื่อใช้เปลี่ยน flag

   ```ruby
   def don
    @task.update!(done: !@task.done)
  end
   ```

- แก้ไข action `destroy` ใน `app/controllers/tasks_controller.rb` เพื่อใช้ในการลบรายการที่ทำออก

  ```ruby
  def destroy
    @task.destroy!
  end
  ```

- จะเห็นได้ว่าโค้ดในส่วนของการ render response ข้างต้นนั้นหายไปเลย นั้นเพราะว่าเราจะใช้ความสามารถของ `Turbo Stream` ในการส่ง HTML ไปยังหน้าเว็บผ่านทาง Websocket แทน ซึ่งเราจะเข้าไปแก้ไขที่ model `Task` ใน `app/models/task.rb`

  ```ruby
  class Task < ApplicationRecord
    after_create_commit -> { broadcast_append_to :tasks, partial: 'tasks/task', locals: { task: self } }
    after_update_commit -> { broadcast_replace_to :tasks, target: "#{self.class.name.downcase}_#{id}", partial: 'tasks/task', locals: { task: self } }
    after_destroy_commit -> { broadcast_action_to :tasks, action: "remove", target: "#{self.class.name.downcase}_#{id}" }
  end
  ```

- เพิ่ม `Turbo Stream` เข้าไปใน `index`

  ```html
  ...
  <h1 class="title">Todo</h1>

  <%= turbo_stream_from :tasks %>
  ```

- ที่นี้ในส่วนของการแก้ไขรายการสิ่งที่จะทำอันเก่านั้น เราจะใช้ form เดิมที่อยู่ด้านบน ดังนั้นเราจะต้องแก้ไข action `edit` และ `update` ใน `app/controllers/tasks_controller.rb`

  ```ruby
  def edit
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.replace(:new_task, partial: 'tasks/turbo_form', locals: { task: @task }) }
    end
  end

  def update
    @task.update!(task_params)
    respond_to do |format|
      format.turbo_stream { render turbo_stream: turbo_stream.replace(:new_task, partial: 'tasks/turbo_form', locals: { task: Task.new }) }
    end
  end
  ```

- เพิ่ม partial html `_turbo_form.html.erb` ใน `app/views/tasks` 

  ```erb
  # app/views/tasks/_edit.html.erb
  <%= turbo_frame_tag :new_task do %>
    <%= render 'form', task: task %>
  <% end %>
  ```

- เมื่อทดลองใช้งาน form ในการบันทึกหรือแก้ไข จะพบว่าข้อความที่อยู่ใน input ไม่ได้ถูกรีเซทเมื่อมีการบันทึกเรียบร้อยแล้ว ซึ่งเราจะใช้ `Stimulus` มาช่วยในการ reset ค่าที่อยู่ใน input สร้างไฟล์ `turbo_form_controller.js` ใน `app/assets/javascripts/controllers`


- ใส่ controller เข้าไปใน form

  ```html
  <%= form_with(model: task, local: true, data: { controller: 'turbo_form', action: "turbo:submit-end->turbo_form#reset" }) do |form| %>
  ...
  ```

เพียงเท่านี้เราก็จะได้แอพ ​TODO ที่พร้อมใช้งานดังแสดงในวิดีโอด้านล่าง

{% raw %}
<video controls playsinline>
  <source src="/assets/videos/awesome_todo.mov" type="video/mp4">
</video>
{% endraw %}

## References
- [Turbo](https://turbo.hotwire.dev/)
- [Awesome Todo](https://github.com/karn18/awesome_todo)
