---
layout: post
title: Rails+Rollup+Dynamic Import
description: เมื่อต้องทำงานร่วมกันระหว่าง Rails, Rollup และ Dynamic Import
author: Karn
tags:
- ruby
- rails
- rollup
- webpack
- bundling
- splitting
categories: dev
cover: "/assets/images/posts/2021/rails-rollup-dynamic-import/cover.png"
image:
  path: "/assets/images/posts/2021/rails-rollup-dynamic-import/cover.png"
  width: 1200
  height: 630
date: 2021-09-24 13:50 +0700
---
ไม่ใช่เรื่องง่ายสักทีเดียวที่จะถอด **Webpack** ออกจากโปรเจ็ค ด้วยความที่เรายังคงใช้ **Magic Comment** ซึ่งมีเฉพาะใน **Webpack** เท่านั้นในการจัดการ dynamic import อีกทั้ง code splitting ใน `esbuild` ก็ยังอยู่ในขั้น WIP ทำให้กว่าเราจะนำ `esbuild` มาใช้ได้จริงก็คงอีกสักระยะหนึ่ง<!--more-->

สำหรับแนวทางในตอนนี้ที่จะถอด `Webpack` ออกก็คงต้องหันไปพึ่ง `Rollup` ก่อน เพราะโดยตัว `Rollup` เองมีความสามารถในการแยกโค้ดออกเป็น chunk ได้ เพียงแต่อัลกอริทึมที่ `Rollup` สร้างไฟล์ chunk ออกมาจะอยู่ในรูปแบบ `[name]-[hash].js` ซึ่ง hash ที่ออกมานั้นเข้ารหัส SHA256 แต่จะตัดเอาเฉพาะ 8 ตัวแรกเท่านั้น ซึ่งถ้านำไปงานร่วมกับ `Sprockets` เมื่อจะนำไปโปรดักชันจริงจะเกิดปัญหาการที่ `Sprockets` จะทำการ fingerprint และใส่ `hash` ต่อเข้าไปอีกทำให้ไม่สามารถใช้งานได้จริงในตอนนี้

ยกตัวอย่างโค้ดใน `application.js` ที่มีการเรียกใช้ dynamic import ไฟล์ `awesome.js` ดังโค้ดด้านล่าง

```javascript
// application.js
export default function showAwesomeThing () {
  import("./awesome")
}
```

```javascript
// awesome.js
import ConfettiGenerator from "confetti-js"
const element = document.getElementById("my-canvas")
const settings = { target: element }
const confetti = new ConfettiGenerator(settings)
confetti.render()
```

เมื่อใช้ `Rollup` ในการมัดรวมไฟล์ เราจะได้ไฟล์ออกมาเป็น 2 ไฟล์คือ 
1. application.js โดย `Rollup` จะทำการแก้ไขการ import ให้เรานิดหน่อยโดยมี hash ติดเข้าไปในไฟล์ที่จะนำเข้าด้วย
  
    ```javascript
    // application.js
    export default function showAwesomeThing () {
      import("./awesome-2febdb23")
    }
    ```

2. awesome-2febdb23.js ซึ่งจะมี hash ตามหลังชื่อไฟล์ด้วย

และจากที่ได้เกริ่นไว้ข้างต้นว่าเมื่อจะ compile ไปใช้บนโปรดักชันจริง `Sprockets` ก็จะใส่ fingerprint ตามหลังชื่อไฟล์เข้าไปด้วย ทำให้ไฟล์ `awesome` ของเรากลายเป็น `awesome-2febdb23-aca9a2f0c2f4e33486f15c94e3b7901a05e59f7f4f368df17f4adfa3608d3dde.js` แต่ในไฟล์ `application` ยังคงเรียก `import("./awesome-2febdb23")` นั้นเป็นสาเหตุที่ทำให้โปรแกรมทำงานไม่ถูกต้อง


ด้วยความโชคดีที่มีคนเจอปัญหานี้เช่นกันเมื่อใช้ `Sprocket` จึงได้มีคน pull request เพื่อจะทำให้ `Sprockets` ไม่ต้องสนใจไฟล์ที่มี fingerprint ที่ถูกต้องอยู่แล้ว[ตามนี้](https://github.com/rails/sprockets/pull/714) แต่ fingerprint ที่ถูกต้องนั้นก็คือต้องเข้ารหัส SHA256 ถึงแม้ว่า `Rollup` จะใช้ ​SHA256 เช่นกัน แต่จะมีการตัดขนาดเอาแค่ 8 ตัวแรกเท่านั้นทำให้ `Sprockets` มองว่านั้นไม่ใช่ fingerprint ที่ถูกต้อง

ดังนั้นสิ่งที่เราต้องหาทางแก้ไข คือ ทำอย่างไรก็ได้ให้ `Rollup` สามารถสร้างไฟล์ chunk ที่มี hash ที่ถูกต้อง โดยถ้าเข้าไปดูที่โค้ดจะพบว่าในส่วนของ[การสร้าง chunk](https://github.com/rollup/rollup/blob/master/src/Chunk.ts#L880) จะมีโค้ด substr อยู่นั้นเอง เราก็แก้ไขโค้ดตรงนี้ หรือไม่ก็ใช้วิธีการเพิ่ม option เข้าไปในการ build ซึ่งผมก็ได้เลือกใช้วิธีการเพิ่ม option เข้าไปดีกว่า เพราะมันน่าจะยืดหยุ่นกว่า[ตามนี้](https://github.com/karn18/rollup)
โดยสิ่งที่ได้ทำเพิ่มเข้าไปก็เป็นการเพิ่ม option ที่ชื่อ `chunkHashLength` เพื่อใช้กำหนดขนาดของ hash ที่ออกมามามีการสร้างไฟล์ chunk

```javascript
import resolve from "@rollup/plugin-node-resolve"
export default {
  input: [ "src/main.js" ],
  output: {
    dir: "dist",
    format: "es",
    chunkFileNames: '[name].[hash].js',
    chunkHashLength: 64
  },
  plugins: [
    resolve()
  ]
}
```

จากนั้นเราก็ใช้ `Rollup` ที่ได้รับการเพิ่มเติม option และก็เรียกใช้ `assets:precompile` และรันโปรแกรมแบบโปรดักชันตามปกติได้เลย

![web-production](/assets/images/posts/2021/rails-rollup-dynamic-import/web-production.png){:width="800px"}
*dynamic import with Rollup*

สำหรับในตอนนี้การใช้ workaround นี้ก็น่าจะตอบโจทย์ของเราในการที่จะใช้ dynamic import โดยไม่ต้องพึ่ง `Webpack` อีกต่อไปได้แล้ว เดี่ยวถ้ามีแนวทางอะไรดีๆ เกี่ยวกับการถอด `Webpack` ออกจะเอามาเล่าให้ฟังกันอีกทีนะครับ Bye 👋

## References
- [jsbundling](https://github.com/rails/jsbundling-rails)
- [Rollup](https://rollupjs.org/)
- [Sprockets](https://github.com/rails/sprockets/)
- [Rollup ที่ fork ออกมาและเพิ่มเติม option](https://github.com/karn18/rollup)
