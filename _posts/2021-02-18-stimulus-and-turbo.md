---
layout: post
title: Stimulus ปะทะ Turbo
author: Karn
tags:
- ruby
- rails
- turbo
categories: dev
cover: "/assets/images/posts/2021/stimulus-and-turbo/cover.png"
image:
  path: "/assets/images/posts/2021/stimulus-and-turbo/cover.png"
  width: 1200
  height: 630
date: 2021-02-18 12:10 +0700
---
จากบทความเรื่อง **Turbo** 👉 [ลิงค์]({% post_url 2020-12-28-html-over-with-turbo %}) และตัวอย่างการใช้งาน **CustomEvent** 👉 [ลิงค์]({% post_url 2021-02-05-use-customevent-to-communicate-between-stimulus-controllers %}) ทำให้เกิดความคิดว่าน่าจะลองนำ **Turbo** มาใช้ในการแสดงเนื้อหาก็น่าจะได้นะ<!--more-->

และโจทย์ในวันนี้ต่อยอดจากครั้งที่แล้ว โดยเริ่มต้นเราจะถอด **CustomEvent** ที่ใช้สื่อสารกันระหว่าง controller ออก และใช้ **Turbo Frame** แทน จากนั้นเพิ่ม controller เข้าไปอีกตัวใช้สำหรับการดึงเนื้อหาย่อยมาแสดงอีกรอบหนึ่ง ซึ่งตรงนี้จะเห็นได้ว่าเราจะมี controller ซ้อน controller อยู่ เรามาดูกันว่าการสื่อสารระหว่าง controller จะเป็นอย่างไร

ก่อนอื่นขอย้อนกลับไปที่บทความก่อนหน้า เราได้ใช้ **CustomEvent** ในการสื่อสารกันระหว่าง controller ที่อยู่ในระนาบเดียวกัน แต่สำหรับบทความนี้เราจะใช้พูดถึงการสื่อสารระหว่าง controller ในแนวตั้ง ทั้งนี้ผมขอเรียกแบบนี้นะครับ

1. การสื่อสารในแนวราบ หรือการสื่อสารระหว่าง controller กับ controller ที่อยู่ข้างๆ กันหรือระนาบเดียวกัน

    ![Side by Side](/assets/images/posts/2021/stimulus-and-turbo/side_by_side.png){:width="600px"}

    > สำหรับการสื่อสารระหว่าง controller ในรูปแบบนี้ ผมก็จะเลือกใช้ CustomEvent ส่งระหว่าง controller A ไปยัง controller B หรือจาก controller B กลับไปยัง controller A

2. การสื่อสารในแนวตั้ง หรือการสื่อสารระหว่าง controller แม่ กับ controller ลูก

    ![Inheritance](/assets/images/posts/2021/stimulus-and-turbo/inheritance.png){:width="300px"}

-----

## ลงมือแก้ไขกันเถอะ

- แรกเริ่มก็ให้เปลี่ยน `div` ที่ใช้แสดงเนื้อหาเป็น `turbo_frame` และก็ให้เอา **Sidebar Controller** ออกเลย ระบุ `data-turbo-frame` ในลิงค์ที่จะกดคลิกให้ชื่อตรงกับที่เราตั้งชื่อไว้ใน `turbo_frame` เพราะทันทีที่คลิกลิงค์ **Turbo** จะนำเนื้อหาที่ได้ไปแสดงยัง `data-turbo-frame` ที่ระบุเอาไว้

### index.html.erb

```erb
<main class="container section">
  <div class="columns">
    <div class="column is-one-third">
      <aside class="menu">
        <ul class="menu-list">
          <li><a data-turbo-frame="content" href="/about">About</a></li>
          <li><a data-turbo-frame="content" href="/contact">Contact</a></li>
        </ul>
      </aside>
    </div>
    <div class="column">
      <%= turbo_frame_tag "data_content", class: "card", data: { controller: "content",  "content-target": "body" }, src: about_path do %>
      <% end %>
    </div>
  </div>
</main>
```

- ปรับแก้ view เล็กน้อย โดยการนำ `turbo_frame` ไปครอบเนื้อหาไว้ดังตัวอย่างหน้า `about.html.erb` 

### about.html.erb

```erb
<%= turbo_frame_tag "content" do %>
  <%= render 'pages/about' %>
<% end %>
```

> เอาตรงๆ โค้ดเพียงแค่นี้เราก็สามารถเปลี่ยนเนื้อหาตามลิงค์ที่เราคลิกได้แล้ว โดยไม่ต้องใช้ CustomEvent ใดๆ เลย

- ถัดมาเราจะสร้าง controller อีกตัวหนึ่งไว้สำหรับจัดการเมนูและดึงเนื้อหาย่อยมาแสดงในหน้า **About** โดยเราจะทำเป็นเมนูแบบ dropdown คือ Books, Blogs และ Activities ซึ่งแต่ละหน้าก็จะไปดึงหน้าย่อยที่แตกต่างกัน

- ปกติแล้ว **Turbo** จะทำงานก็ต่อเมื่อเราใช้แท็ก `a` เท่านั้น แต่ในตัวอย่างเราจะใช้แท็ก `select` ดังนั้นจะต้องใช้ controller เข้ามาช่วยในการเรียกใช้งาน **Turbo**

### _about.html.erb

```erb
<div class="card" data-controller="colorize">
  <div class="card-content" data-colorize-target="body">
    <div class="content" data-controller="about" data-about-init-value="<%= books_path %>" data-action="loaded->colorize#loaded">
      <h1>About</h1>
      <p>My name is Karn Tirasoontorn</p>
      <p>I am computer engineer who love to code with <strong class="has-text-primary-dark">Ruby</strong></p>

      <div class="select">
        <select data-action="change->about#change">
          <option data-url="<%= books_path %>">Books</option>
          <option data-url="<%= blogs_path %>">Blogs</option>
          <option data-url="<%= activities_path %>">Activities</option>
        </select>
      </div>

      <div class="content my-4">
        <span class="tag">
          Tag label
        </span>
        <%= turbo_frame_tag "about", src: books_path, data: { "about-target": "result" } do %>

        <% end %>
      </div>
    </div>
  </div>
</div>
```

จากส่วนของ **HTML** ข้างบนจะพบว่าเราจะใช้ controller ด้วยกัน 2 ตัวคือ
1. ColorizeConroller จะใช้สำหรับเปลี่ยนสีพื้นหลัง `card` โดยจะเปลี่ยนก็ต่อเมื่อ AboutController ซึ่งเป็น controller ลูกเมื่อโหลดเนื้อหาเสร็จแล้ว ผ่าน CustomEvent ชื่อ `loaded`
2. AboutController จะคอยจัดโหลดเนื้อหา เมื่อมีการเลือกเมนู ทันทีที่เนื้อหาโหลดก็จะสร้าง CustomEvent ชื่อ `loaded` แล้วส่งออกไป

### about_controller.rb

```javascript
  change (event) {
    const selected = event.target[event.target.selectedIndex]
    const url = selected.getAttribute('data-url')
    this.loadContent(url)
  }

  loadContent (url) {
    document.querySelector("turbo-frame[id='about']").src = url
    this.dispatchLoadedEvent(url) 
  }

  dispatchLoadedEvent (url) {
    this.element.dispatchEvent(new CustomEvent("loaded", {
      bubbles: true,
      detail: { url: url }
    }))
  }
```
> CustomEvent ที่สามารถส่งผ่านจากลูกไปถึงแม่ได้นั้นจะต้องกำหนด option `bubbules` เป็น `true` ด้วยนะ

สำหรับ controller แม่สามารถรับรู้เหตุการณ์ที่ลูกผ่นออกได้ ด้วยการระบุชื่อเหตุการณ์ `loaded` ไว้ใน `data-action` ดังโค้ดด้านล่าง

```erb
...
<div class="content" data-controller="about" data-action="loaded->colorize#loaded">
  ...
</div>
```

ผลลัพท์ที่ได้ก็จะประมาณนี้

{% raw %}
<div class="video">
  <video controls playsinline>
    <source src="/assets/videos/stimulus_turbo.mov" type="video/mp4">
  </video>
</div>
{% endraw %}

## References
- [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
- [Turbo](https://turbo.hotwire.dev/)
- [Stimulus](https://stimulus.hotwire.dev/)
