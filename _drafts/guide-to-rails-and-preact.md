---
layout: post
title: Guide to Rails and Preact (Part 1)
author: Karn
tags:
- rails
- preact
categories: dev
---
💡 สำหรับ **frontend developer** การเลือกใช้ไลบราลี **JavaScript** มาใช้งานในโปรเจคมีได้หลากหลายปัจจัย โดยในบทความนี้จะแนะนำไลบราลี **Preact** ซึ่งถือเป็นไลบราลีขนาดเล็ก และคุ้นเคยกับการใช้งาน **React**<!--more-->

## เริ่มต้น
- สร้างโปรเจคใหม่

```bash
$ rails new myblog --wepacker -d postgresql
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

- สร้าง **controller** ชื่อ `Home` และ **action** ชื่อ `index`

```bash
$ rails generate controller Home index
```

- กำหนด **routes** ในการเข้าถึงใน `config/routes.rb`

```ruby
Rails.application.routes.draw do
  root to: 'home#index'
end
```

- กำหนด

- สร้าง **interactive component** `Box` โดยสร้างไฟล์ `app/javascripts/packs/box.jsx` ซึ่งจะรับค่าจากผู้ใช้ในช่อง **input** และเมื่อมีการกดปุ่ม จะนำข้อความที่ได้ไปแสดงผลลงในบริเวณที่กำหนดไว้

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

## Referecnes
- [PREACT](https://preactjs.com)