---
layout: post
title: Guide to Rails and Preact (Part 1)
author: Karn
tags:
- rails
- preact
categories: dev
cover: '/assets/images/posts/2020/guide-to-rails-and-preact-part-1/cover.jpg'
image:
  path: '/assets/images/posts/2020/guide-to-rails-and-preact-part-1/cover.jpg'
date: 2020-06-19 22:36 +0700
---
💡บทความนี้จะแนะนำไลบราลีที่ชื่อ **Preact** ซึ่งถือเป็นไลบราลี **JavaScript** ขนาดเล็กและทันสมัยให้กับ **Frontend Developer** ได้รู้จักกัน โดยในบทความจะแนะนำวิธีการติดตั้ง **Preact** บน **Rails**<!--more-->

## เริ่มต้น
- สร้างโปรเจคใหม่

```bash
$ rails new book_store --wepacker -d postgresql
```

- ติดตั้ง **Preact** และปลักอินสำหรับ **compile**

```bash
$ yarn add preact @babel/plugin-transform-react-jsx
```

- เพิ่มปลักอิน `plugin-transform-react-jsx` เข้าไปยัง `babel.config.js`

```javascript
plugins: [
  ...,
  [
    "@babel/plugin-transform-react-jsx",
    { "pragma": "h" }
  ]
]
```

- สร้าง **controller** ชื่อ `Pages` และ **action** ชื่อ `index`

```bash
$ rails generate controller Pages index
```

- กำหนด **routes** ในการเข้าถึงใน `config/routes.rb`

```ruby
Rails.application.routes.draw do
  root to: 'pages#index'
end
```

- กำหนด **file extensions** ของ `jsx` เพิ่มเติมใน `config/webpacker.yml`

```yml
...
extensions:
  - .js
  - .jsx
...
```

- สร้าง **interactive component** `Box` โดยสร้างไฟล์ `app/javascripts/packs/box.jsx` ซึ่งจะรับค่าจากผู้ใช้ในช่อง **input** และเมื่อกดปุ่ม จะนำข้อความที่ได้ไปแสดงผลในบริเวณที่กำหนดไว้

```jsx
import { h, render, Component } from 'preact'

class Box extends Component {
  state = { value: '', name: '' }

  onInput = (event) => {
    this.setState({ value: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.setState({ name: this.state.value })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.value} onInput={this.onInput}></input>
          <button type="submit">อัพเดต</button>
        </form>

        <h1>แสดงผลที่นี่: {this.state.name}</h1>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  render(<Box />, document.body)
})
```

- เพิ่ม **tag** สำหรับโหลด `box` ใน `app/view/home/index.html.erb`

```erb
<%= javascript_pack_tag 'box' %>
```

- รัน **server** และเข้าไปยัง `http://localhost:3000`

![preact](/assets/images/posts/2020/guide-to-rails-and-preact-part-1/preact.png)
*ทดสอบการทำงาน Preact*

สำหรับในบทความนี้ก็จะแนะนำการติดตั้งไว้เพียงเท่านี้ สำหรับในบทความหน้า เราจะมาลงลึกในการใช้งาน **Preact** กัน 🤩

## Referecnes
- [PREACT](https://preactjs.com)
