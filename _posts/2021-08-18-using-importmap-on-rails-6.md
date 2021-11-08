---
layout: post
title: การใช้งาน Importmap บน Rails 6
author: Karn
tags:
- ruby
- rails
- stimulus
- importmap
categories: dev
date: 2021-08-18 11:31 +0700
---
สำหรับ importmap คงจะมีการติดตั้งเป็นค่า default ใน Rails เวอร์ชัน 7 แต่สำหรับใครที่อยากทดลองใช้ใน Rails 6 ก็จะมีขั้นตอนการติดตั้งดังนี้<!--more-->

- เริ่มต้นสร้างโปรเจ็คใหม่ โดยใส่พารามิเตอร์ `--skip--javascript` เข้าไปด้วย เพื่อให้ข้ามการติดตั้ง JavaScript และ Webpack เข้าไปในโปรเจ็ค

  ```bash
  $ rails new hot_espresso --skip-javascript --skip-spring
  ```

- เพิ่ม gem `importmap-rails` และ `hotwire-rails` เข้าไปใน Gemfile

  ```ruby
  # Gemfile
  gem 'importmap-rails'
  gem 'hotwire-rails'
  ```

- ติดตั้ง Gem และรันคำสั่งติดตั้งต่างๆ

  ```bash
  $ ./bin/bundle install
  $ ./bin/rails importmap:install
  $ ./bin/rails hotwire:install
  ```


- เมื่อรันคำสั่งเรียบร้อยแล้วก็จะได้ไฟล์  `config/initializers/importmap.rb` ขึ้นมา

  ```ruby
  Rails.application.config.importmap.draw do
    pin "@hotwired/turbo-rails", to: "turbo.js"

    pin "@hotwired/stimulus", to: "stimulus.js"
    pin "@hotwired/stimulus-importmap-autoloader", to: "stimulus-importmap-autoloader.js"
    pin_all_from "app/javascript/controllers", under: "controllers"

    pin "application"
  end
  ```

- สร้างหน้าเว็บขึ้นมาก่อน

  ```bash
  $ ./bin/rails generate controller Page index
  ```

- เพิ่ม routes ใหม่เข้าไป

  ```ruby
  # config/routes.rb

  Rails.application.routes.draw do
    get 'pages/index'
    root 'pages#index'
  end
  ```

## Stimulus
- เริ่มต้นด้วย Stimulus โดยการสร้างไฟล์ `app/javascript/controllers/hello_controller.js` และเพิ่ม html เข้าไปใน `app/views/pages/index.html.erb`

  ```javascript
  import { Controller } from "@hotwired/stimulus"

  export default class extends Controller {
    connect() {
      this.element.textContent = "Hello World!"
    }
  }
  ```

  ```html
  <h1>Pages#index</h1>
  <p>Find me in app/views/pages/index.html.erb</p>

  <div data-controller="hello"></div>
  ```

- รีสตาร์ท server และรันเว็บขึ้นมาตรวจสอบ

![Stimulus](/assets/images/posts/2021/using-importmap-on-rails-6/stimulus.png){:width="600px"}
*Stimulus*
  
## Vue
- มาต่อกันด้วย Vue โดยเริ่มสร้างโฟลเดอร์ `app/javascript/components` ไว้สำหรับเก็บคอมโพแนนท์ของ Vue
- สร้างคอมโพแนนท์ `reverse` ขึ้นมา

  ```javascript
  // app/javascript/components/reverse_component.js
  import { Vue } from 'vue'

  var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        this.message = this.message.split('').reverse().join('')
      }
    }
  })
  ```

- ให้เราใส่ `pin "vue", to: 'https://cdn.skypack.dev/vue'` เข้าไปใน `config/initializers/importmap.rb` และ  `pin_all_from "app/javascript/components", under: "components"` เพื่อใช้สำหรับการลงทะเบียนคอมโพแนนทต์เข้าไปยัง importmap
  
  ```ruby
  Rails.application.config.importmap.draw do
    pin "@hotwired/turbo-rails", to: "turbo.js"

    pin "@hotwired/stimulus", to: "stimulus.js"
    pin "@hotwired/stimulus-importmap-autoloader", to: "stimulus-importmap-autoloader.js"
    pin_all_from "app/javascript/controllers", under: "controllers"

    pin "application"

    pin_all_from "app/javascript/components", under: "components"
    pin "vue", to: 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'
  end
  ```

- โหลดโค้ดเข้าไปใน `app/javascript/application.js`

  ```javascript
  import 'components/reverse_component'
  ```

- เพิ่ม html เข้าไปใน `app/views/pages/index.html`

  ```html
  <div id="app">
    <p>{{ message }}</p>
    <button v-on:click="reverseMessage">Reverse Message</button>
  </div>
  ```

- รีสตาร์ท server และรันเว็บขึ้นมาตรวจสอบ

![Vue](/assets/images/posts/2021/using-importmap-on-rails-6/vue.png){:width="600px"}
*Vue*

สำหรับตอนนี้เบราเซอร์ที่รองรับ importmap แบบ native ยังไม่ครบทุกตัว แต่คาดว่าในเร็วๆ นี้ก็คงจะรองรับกันครบทุกตัว
ตัวอย่างโค้ดเข้าไปดูได้ที่ [Hot Espresso](https://github.com/karn18/hot_espresso)

## References:
- [https://www.youtube.com/watch?v=PtxZvFnL2i0](https://www.youtube.com/watch?v=PtxZvFnL2i0)
- [https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755](https://world.hey.com/dhh/modern-web-apps-without-javascript-bundling-or-transpiling-a20f2755)
- [importmap-rails](https://github.com/rails/importmap-rails)
