---
layout: post
title: ติดตั้ง ruby ด้วย rbenv
tags:
  - rbenv
  - ruby
  - 101
categories: dev
cover: "/assets/images/posts/2020/setup-ruby-with-rbenv/cover.png"
image:
  path: "/assets/images/posts/2020/setup-ruby-with-rbenv/cover.png"
date: 2020-09-28 18:04 +0700
---
สำหรับผู้เริ่มต้นจะใช้ **Ruby** การเตรียมสภาพแวดล้อมต่างๆ ให้พร้อมบนเครื่องคอมพิวเตอร์นั้นจำเป็นอย่างมาก ดังนั้นในบทความนี้จะเป็นจุดเริ่มต้นก่อนที่จะลงมือศึกษาการเขียนโค้ดอย่างจริงจังด้วยภาษา **Ruby** ซึ่งก็คือการติดตั้ง **Ruby** นั้นเองครับ

**Ruby** รองรับทั้งผู้พัฒนาทั้ง **Windows**, **Linux** และ **Mac** โดยส่วนตัวผมเองนั้น ปกติก็จะใช้งาน **Linux** และ **Mac** เป็นหลักในการพัฒนาโปรแกรม ซึ่งเราจะใช้ **rbenv** เป็นเครื่องมือที่ช่วยในการติดตั้ง และจัดการเวอร์ชันของ **Ruby**

## ติดตั้ง rbenv

### 1. Homebrew
- เปิด terminal และรันคำสั่ง

```bash
$ brew install rbenv
```

- โหลด **rbenv** บน **shell** ที่ใช้งาน

```bash
$ rbenv init
```

- กำหนดค่าให้ **rbenv** โหลดขึ้นมาใช้งานเมื่อเปิดใช้งาน **terminal** (**~/.zshrc** หรือ **~/.bashrc**)

```bash
eval "$(rbenv init -)"
```

- ตรวจสอบสักหน่อยว่าติดตั้งสำเร็จหรือไม่

```bash
$ rbenv --version
```

![rbenv_version](/assets/images/posts/2020/setup-ruby-with-rbenv/rbenv_version.png){:width="350px"}
*เช็คเวอร์ชันของ rbenv*

### 2. Manual ผ่าน Git Checkout

- โคลน **rbenv** ไปวางไว้ที่ `~/.rbenv`

```bash
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
```

- เพิ่ม `~/.rbenv/bin` เข้าไปใน `$PATH`

  - สำหรับผู้ใช้ ZSH

  ```bash
  $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc  # ZSH
  ```

  - สำหรับผู้ใช้ BASH

  ```bash
  $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc # BASH
  ```

- โหลด **rbenv** บน **shell** ที่ใช้งาน

```bash
$ rbenv init
```

- กำหนดค่าให้ **rbenv** โหลดขึ้นมาใช้งานเมื่อเปิดใช้งาน **terminal** (**~/.zshrc** หรือ **~/.bashrc**)

```bash
eval "$(rbenv init -)"
```

- ตรวจสอบสักหน่อยว่าติดตั้งสำเร็จหรือไม่

```bash
$ rbenv --version
```

![rbenv_version](/assets/images/posts/2020/setup-ruby-with-rbenv/rbenv_version.png){:width="350px"}
*เช็คเวอร์ชันของ rbenv*

## ติดตั้ง Ruby
- ตรวจสอบรายการเวอร์ชันของ **Ruby** ที่สามารถติดตั้งได้

```bash
$ rbenv install --list
```

![rbenv_version](/assets/images/posts/2020/setup-ruby-with-rbenv/rbenv_list.png){:width="600px"}
*รายการเวอร์ชันของ ruby ที่สามารถติดตั้งได้*

- ติดตั้งเวอร์ชันที่จะใช้งาน (ผมจะติดตั้ง version 2.7.1)

```bash
$ rbenv install 2.7.1
```

- ตรวจสอบเวอร์ชันที่ติดตั้งผ่าน **rbenv**

```bash
$ rbenv versions
```
![rbenv_version](/assets/images/posts/2020/setup-ruby-with-rbenv/rbenv_versions.png){:width="420px"}
*รายการเวอร์ชันของ ruby ที่ติดตั้งผ่าน rbenv*

กำหนดเวอร์ชันของ **ruby** แบบ **global** เพื่อใช้งาน

```bash
$ rbenv global 2.7.1
```

สำหรับ **rbenv** มีคำสั่งอื่นๆ ที่ให้เราใช้งานอีกมาก ซึ่งสามารถศึกษาได้จาก [#command-reference](https://github.com/rbenv/rbenv#command-reference)

> สำหรับนักพัฒนาบน Windows อย่าเพิ่งน้อยใจ

ถึงแม้ **rbenv** จะไม่มีให้ใช้บน **Windows** แต่เราก็สามารถที่จะติดตั้ง **ruby** ได้ด้วย **RubyInstaller for Windows** ซึ่งวิธีการติดตั้งนั้นก็ง่ายมากๆ เพียงดาว์นโหลดตัวติดตั้งตามเวอ์ชันที่จะใช้งาน จากนั้นเพียงแค่ดับเบิลคลิกและกด **Next** ไปเรื่อยๆ จนจบเพียงเท่านั้นก็สามารถใช้งาน **Ruby** บนเครื่องคอมพิวเตอร์ของเราได้

## References
- [rbenv](https://github.com/rbenv/rbenv)
- [rubyinstaller](https://rubyinstaller.org/)
