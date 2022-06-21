---
layout: post
title: Svelte join forces with Rails and Turbo
description: We use data-attributes to connect svelte components
author: Karn
tags:
- rails
- svelte
- turbo
categories: dev
twitter:
  card: summary_large_image
image:
  path: https://surfup.karn.work/covers/835ddb9c80/b6e342a54b.png
  width: 1200
  height: 630
date: 2022-04-21 12:32 +0700
---
เริ่มต้นมันเกิดจากที่ว่าอยากทดลองใช้งาน **Svelte** ดู แต่ก็อยากใช้ **Rails** เป็น server แทนที่จะใช้ **SvelteKit** เลยต้องหาแนวทางที่จะทำงานร่วมกัน ด้วยที่ปกติใช้ **Stimulus** ก็เลยได้ไอเดียของการ register คอนโทรลเลอร์ที่ใช้งานเก็บไว้ และถ้าจะใช้งานคอนโทรลเลอร์ตัวไหนกับ HTML ใดก็จะผูกกันด้วย `data-attributes` ดังนั้นเราจึงได้พัฒนา **Registry** ง่ายๆ ขึ้นมาทดสอบกัน

```js
// app/javscript/application.js
import "@hotwired/turbo-rails"

import { Registry } from "./svelte/registry"
import App from './components/App.svelte'
import About from './components/About.svelte'

const registry = new Registry()
registry.start()
registry.register("main", App)
registry.register("about", About)
```

สำหรับหน้าที่ของ **Registry** จะทำหน้าที่เก็บชุดข้อมูลชื่อ และคอมโพเนนต์ของ **Svelte** และเมื่อโค้ดสั่งให้ทำงานจะทำการค้นหา `data-attributes` ที่ตรงตามเงื่อนไข ซึ่งเราได้กำหนดให้เป็น `data-svelte-component={name}` และทำการ render คอมโพเนนต์เข้าไปยัง element นั้น

จากโค้ดข้างต้นจะเห็นว่า **Registry** ได้ลงทะเบียนคอมโพเนนต์ 2 ตัวคือ
1. **App** ซึ่งจะทำการผูกกับชื่อ main
2. **About** ซึ่งจะทำการผูกกับชื่อ about

เพื่อความสะดวกในการใช้งาน เราจะได้สร้าง **tag helper** ที่ชื่อ `svelte_component` ขึ้นมาตอนใช้งานด้วย ทำให้เวลาที่ต้องการ render คอมโพเนนต์บนหน้า HTML จะเรียกผ่าน `svelte_component` ดังแสดงในตัวอย่างด้านล่าง

```ruby
module SvelteHelper
  def svelte_component(identifier, props = {}, tag_name: "div")
    data_attr = { svelte_component: identifier }
    data_attr = data_attr.merge(svelte_props: props) unless props.empty?

    tag.__send__(tag_name, data: data_attr)
  end
end

ActionView::Base.extend SvelteHelper
```

```html
<!-- app/views/home/index.html -->
<main class="w-full md:w-3/5 lg:w-2/5 mx-auto">
  <%= link_to "about", :about, class: "inline-flex rounded-full border items-center h-9 mt-6 px-3" %>

  <%= svelte_component "main" %>
</main>

```

## ทดสอบการทำงาน

![](/assets/images/posts/2022/svelte-join-forces-with-rails-and-turbo/home.png){:width="600px"}
*Home*

```js
<script>
  import { onMount } from "svelte"
  import { get } from "@rails/request.js"
  let books = []

  async function getBooks () {
    const response = await get('http://localhost:3000/api/books.json', { responseKind: "json" })
    if (response.ok) {
      return response.json
    }
    return null
  }

  onMount(async () => {
    books = await getBooks()
  })
</script>

<h1 class="font-bold text-3xl pt-8">Books</h1>
{#if books}
<ul class="bg-slate-50 p-4 my-4 text-sm leading-6">
  {#each books as book}
    <li>
      <a href={book.url} class="group flex rounded-md m-2 p-3 bg-white ring-1 ring-slate-200 shadow-sm">
        ...
      </a>
    </li>
  {/each}
</ul>
{/if}
```

![](/assets/images/posts/2022/svelte-join-forces-with-rails-and-turbo/generated_html.png){:width="600px"}
*HTML ที่ถูกสร้างจาก Svelte*

![](/assets/images/posts/2022/svelte-join-forces-with-rails-and-turbo/about.png){:width="600px"}
*About*

> ทั้งนี้ **Registry** ยังรองรับการทำงานร่วมกับ Turbo อีกด้วย ทำให้เวลาที่มีการเปลี่ยนหน้าตัว browser จะไม่ต้องโหลด resource ใหม่ทั้งหมด

Demo: [https://svelte.karn.work/home/index](https://svelte.karn.work/home/index)
