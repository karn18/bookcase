---
layout: post
title: Guide to Rails and Preact (Part 2)
author: Karn
tags:
- rails
- preact
categories: dev
cover: "/assets/images/posts/2020/guide-to-rails-and-preact-part-2/cover.jpg"
image:
  path: "/assets/images/posts/2020/guide-to-rails-and-preact-part-2/cover.jpg"
  height: 100
  width: 100
date: 2020-08-10 22:02 +0700
---
มาต่อจากตอนที่แล้ว [part 1]({% post_url 2020-06-19-guide-to-rails-and-preact-part-1 %}) เราได้สร้างโปรเจค **book_store** เอาไว้ แต่ยังไม่ได้มีการสร้างฟอร์มสำหรับเก็บข้อมูลหนังสือกันเลย สำหรับในบทความนี้จะลองเป็นการพัฒนาโปรแกรมในรูปแบบลูกผสม<!-- more --> โดยจะให้ **Rails** ทำหน้าที่ในการจัด **routing** และ **render** หน้าเว็บหลัก แต่จะมีบางส่วนที่จะพัฒนาเป็น **Component** ขึ้นและใช้เป็น **CSR**
สร้าง **Component** สำหรับการบันทึกข้อมูลหนังสือ

- สร้างโมเดล `Book`

```bash
$ rails generate model Book name:string author:string 'price:decimal{10,2}'
```

- สร้างคอนโทรลเลอร์สำหรับจัดการ `Book`

```bash
$ rails generate scaffold_controller Book
```

- เพิ่ม **resources** ของ **Book** เข้าไปใน **routing**

### config/routing.rb

```rb
  resources :books
```

- สร้างคอมโพเนนต์ `BookForm` สำหรับบันทึกข้อมูล

### app/javascripts/books/bookForm.jsx

```jsx
import { h, render, Component } from 'preact'
import { getCsrfToken } from 'helpers/form'

class BookForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      author: '',
      price: 0
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange = (event) => {
    console.log(event)
    this.setState({ [event.target.name]: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/books', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken()
      },
      body: JSON.stringify(this.state)
    })
    .then(response => response.json())
    .then(data => {
      if (data.errors) {
        // handle errors
      } else {
        window.location.replace(data.next_path)
      }
    })
  }

  render() {
    return (
      <div>
        <h2>สร้างหนังสือใหม่</h2>
        <form class="control" onSubmit={this.onSubmit}>
          <div class='field'>
            <label>ชื่อหนังสือ</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange}></input>
          </div>
          <div class='field'>
            <label>ผู้เขียน</label>
            <input type="text" name="author" value={this.state.author} onChange={this.onChange}></input>
          </div>
          <div class='field'>
            <label>ราคา</label>
            <input type="number" name="price" pattern="(\d{3})([\.])(\d{2})" value={this.state.price} onChange={this.onChange}></input>
          </div>
          <button type="submit">สร้าง</button>
          <button onClick={() => window.history.go(-1)}>กลับ</button>
        </form>
      </div>
    )
  }
}

export default BookForm
```

- สร้าง `book.js` ไว้สำหรับเป็น entry point ในการโหลด **Component** เข้าไปยังหน้าเว็บ

### app/javascripts/packs/book.js

```js
import { h, render } from 'preact'
import BookForm from '../books/bookForm'

let checkReady = () => {
  return new Promise((resolve) => {
    if (document.readyState !== 'loading') {
      return resolve()
    }
    document.addEventListener('DOMContentLoaded', () => resolve())
  })
}

checkReady().then(() => {
  let form = document.querySelector('.book-form')
  render(<BookForm />, form)
})
```

- แก้ไขหน้าสร้าง `Book` ให้ทำการโหลดคอมโพเนนต์ที่เราได้สร้างขึ้นสำหรับการบันทึกข้อมูล

### app/views/books/new.html.erb

```erb
<%= javascript_packs_with_chunks_tag 'book' %>

<div class="book-form"></div>
```

- รองรันโปรแกรม และเข้าไปยังหน้าฟอร์มบันทึกข้อมูล ก็จะเห็นคอมโพเนนต์ **BookForm** ปรากฏอยู่ในหน้าเว็บ และสามารถบันทึกข้อมูลหนังสือได้

![preact](/assets/images/posts/2020/guide-to-rails-and-preact-part-2/book_form.png)
*BookForm Component*

💡อะไรที่เราได้จากการพัฒนาโปรแกรมในรูปแบบนี้

- เราสามารถพัฒนาคอมโพเนนต์ได้มากมาย และสามารถนำไปใช้งานหน้าเว็บอื่นๆ ได้
- ไม่จำเป็นต้องสร้าง **Rest API** ให้กับคอมโพเนนต์ แต่เราต้องมี **endpoint** สำหรับบันทึกค่าจากฟอร์ม
