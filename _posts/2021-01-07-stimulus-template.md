---
layout: post
title: Stimulus Template
author: Karn
tags:
- stimulus
- template
categories: dev
cover: "/assets/images/posts/2021/stimulus-template/cover.png"
image:
  path: "/assets/images/posts/2021/stimulus-template/cover.png"
  width: 1200
  height: 630
date: 2021-01-07 09:39 +0700
---
ด้วยความตั้งใจที่ว่าจะต้องแยกโค้ดจากโปรเจ็คออกมาเป็นโมดูลเท่าที่จะทำได้ ไม่ว่าจะเป็นในฝั่งของ Ruby หรือ JavaScript แต่ก็ไม่รู้ว่าจะเริ่มจากตรงไหนดี ก็เลยได้รีวิวโค้ดบางส่วนไป และก็พบว่าโปรเจ็คเราใช้ **Stimulus** อยู่ไม่น้อย เอาเป็นว่าเริ่มจากในฝั่ง JavaScript กันก่อนแล้วกัน ซึ่งคงต้องทำเป็น **node module** และเพื่อให้ง่ายต่อการพัฒนาในอนาคตก็เลยทำ **Template** หรือ **Boilerplate** ไว้ใช้ดีกว่า<!--more-->

## วิธีการใช้งาน

- โคลน [repository](https://github.com/karn18/stimulus-template) ลงมาไว้ที่เครื่อง

    ```bash
    $ git clone https://github.com/karn18/stimulus-template
    ```
  
- ติดตั้ง dependencies ต่างๆ

    ```bash
    $ yarn install
    # npm install
    ```

- แก้ไขชื่อโปรเจคในไฟล์ package.json
- แก้ไขโค้ดในส่วนของ controller ใน `src/index.js`
- รัน `build` เพื่อ transpile โค้ดของเราผ่าน `rollup`

    ```bash
    $ yarn build
    # npm build
    ```

- เขียน test ใน `test/index.test.js`
- ทดสอบ controller ผ่าน `jest`

    ```bash
    $ yarn test
    # npm test
    ```

อันนี้เป็นเพียงขั้นแรกเท่านั้น ซึ่งพอนึกดูดีๆ แล้วเราสามารถนำ Stimulus Controller ที่เราจะแยกไปทำให้อยู่ในรูปของ gem น่าจะดีกว่า ไม่ว่าจะเป็นเรื่องของการติดตั้ง การเพิ่ม controller ตัวใหม่เข้าไปใน registry การจัดการกับ assets เอาเป็นว่าเดี่ยวจะมาอธิบายในบทความหน้าแล้วกัน 

## References
- [Testing Stimulus](https://damonbauer.dev/posts/testing-stimulus-with-jest/)
- [Stimulus Template](https://github.com/karn18/stimulus-template)
