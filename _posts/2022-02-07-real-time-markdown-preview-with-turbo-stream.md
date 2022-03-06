---
layout: post
title: พรีวิว Markdown ด้วย Turbo Stream
description: ถ้าอยากจะทำพรีวิว Markdown แบบ Realtime ด้วย Turbo Stream ผลลัพท์จะออกมาเป็นอย่างไร ลองติดตามกันดู
author: Karn
tags:
- rails
- turbostream
categories: dev
image:
  path: "/assets/images/posts/2022/real-time-markdown-preview-with-turbo-stream/cover.png"
  width: 1200
  height: 800
date: 2022-02-07 10:12 +0700
---
จากบทความ[Real-time previews with Rails and StimulusReflex](https://www.colby.so/posts/real-time-previews-with-stimulus-reflex) ได้สร้างเว็บแอพพลิเคชันที่ใช้ **StimulusReflex** ในการแสดงพรีวิว Markdown แบบเรียลไทม์ได้อย่างยอดเยี่ยมเลยทีเดียว แถมใช้เวลาในการอัพเดต DOM ได้รวดเร็วอีกด้วย แต่ด้วยปกติผมไม่ได้ **StimulusReflex** ดังนั้นในบทความนี้เราจะมาเปลี่ยนมาใช้ **Stimulus** กับ **TurboStream** ที่เราคุ้นเคยกันดีกว่า ประกอบกับเคยเขียนแนวทางพัฒนาพรีวิว Markdown ไวก่อนหน้านี้แต่ตอนนั้นยังไม่ได้ใช้ **TurboStream** ทีในบทความ[ลองพัฒนา markdown preview](https://karn18.github.io/dev/2020/06/03/create-markdown-preview.html)

ในบทความนี้ผมจะใช้โค้ดจากบทความอ้างอิงเป็นหลัก แต่จะปรับโค้ดในฝั่งของ **JavaScript** ให้ใช้เฉพาะ **Stimulus** โดยจะใช้ request ไปยัง URL ในการแสดงพรีวิว และกำหนด content-type ของ respose ที่จะรับกลับมาเป็น `vnd.turbo-stream.html` หรือ **TurboStream** นั้นเอง

```js
// app/javascript/controllers/post_controller.js
import { Controller } from "@hotwired/stimulus"
import { post } from '@rails/request.js'

export default class extends Controller {
  static values = {
    id: String
  }
  static targets = [ "body", "bodyPreview" ]

  connect () {
    this.preview = this.debounce(this.preview, 1000).bind(this)
    this.preview()
  }

  async preview () {
    await post(`/posts/preview`, { body: JSON.stringify({ body: this.bodyTarget.value, id: this.idValue }), responseKind: "turbo-stream" }) 
  }

  debounce (fn, delay = 1000) {
    ...
  }
}
```

ที่จะแตกต่างจากของเดิมก็คือในโค้ด values จะรับ `id:String` เข้ามาเพื่อใช้ในการอ้างอิงกับ **TurboFrame** ส่วน targets จะสนใจเฉพาะ **body** และ **bodyPreview** เท่านั้น และในเมธอด `preview` ก็จะเรียก POST ไปยัง `/posts/preview` ที่รับ response กลับมาเป็น **TurboStream**

ในฝั่งหลังบ้านนั้นก็จะสร้าง action `preview` ขึ้นมาเพื่อแกะพารามิเตอร์ `body` และ `id` ออกมาเท่านั้นจากนั้นก็ส่งค่าไปให้ view ในการแสดงผล ซึ่งใน view เองก็จะมีการเรียกใช้ helper ที่ชื่อ `to_markdown` ซึ่งจะทำการแปลง text ให้อยู่ในรูปของ **Markdown**

```ruby
# app/controllers/posts_controller.rb
def preview
  @body = params[:body]
  @id = params[:id]
end
```

```erb
<%# app/views/posts/preview.turbo_stream.erb %>
<%= turbo_stream.replace "post_#{@id}_preview" do %>
  <%= turbo_frame_tag :"post_#{@id}_preview" do %>
    <%= render "preview", body: @body %>
  <% end %>
<% end %>
```

```erb
<%# app/views/posts/_preview.html.erb %>
<div class="p-4 mt-4 rounded-sm">
  <h1 class="text-black">Markdown Preview</h1>
  <article class="prose">
    <div data-post-target="bodyPreview">
      <%= to_markdown(body) %>
    </div>
  </article>
</div>
```

จากนั้นที่เหลือก็ปล่อยให้เมจิกของ **Hotwired** ได้ทำงาน โดยผลลัพท์ที่ได้ดังแสดงในวิดีโอด้านล่าง

{% raw %}
<video controls playsinline>
  <source src="/assets/videos/markdown_preview.mov" type="video/mp4">
</video>
{% endraw %}

## สรุป

สำหรับทั้งสองวิธีการยังคงให้ผลลัพท์ในการทำงานที่เหมือนกัน แต่ที่จะแตกต่างกันก็คือ เมื่อเราใช้งาน **StiumulusReflex** การส่งข้อมูลและอัพเดตข้อมูลจะกระทำผ่าน **WebSocket** เป็นหลักจะสังเกตได้จากรูปด้านล่าง

![](/assets/images/posts/2022/real-time-markdown-preview-with-turbo-stream/stimulus_reflex.png){:width="600px"}
*Stimulus Reflex*

แต่ในบทความนี้จะเป็นการ request ผ่าน HTTP

![](/assets/images/posts/2022/real-time-markdown-preview-with-turbo-stream/turbo_stream.png){:width="600px"}
*Turbo Stream*
