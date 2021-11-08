---
layout: post
title: Sprocket กับไฟล์ assets ที่เข้ารหัสไว้แล้ว
author: Karn
tags:
- ruby
- rails
- sprocket
categories: dev
cover: "/assets/images/posts/2021/sprocket-and-digested-assets/cover.png"
image:
  path: "/assets/images/posts/2021/sprocket-and-digested-assets/cover.png"
  width: 1200
  height: 800
date: 2021-11-07 21:53 +0700
---
แม้ว่า **Rails** จะอัพเดตเป็นเวอร์ชัน 7 แล้วแต่ **Sprocket** ก็ถือเป็นอีกหนึ่งไลบราลีที่ยังคงผูกอยู่กับ **Rails** เพื่อใช้ในการจัดการคอมไฟล์ และดูแลจัดการ assets ต่างๆ ด้วย ยิ่งในระดับโปรดักชันแล้ว **Sprocket** จะช่วยทำ fingering ไฟล์ assets ต่างๆ เพื่อใช้สำหรับ caching อีกด้วย<!-- more -->

และจากบทความเรื่อง[Rails+Rollup+Dynamic Import]({% post_url 2021-08-18-using-importmap-on-rails-6 %}) เราก็มีการพูดถึงการใช้ **Dynamic Import** ซึ่งก็พยายามแก้ไข **Rollup** ให้สร้าง fingerprint ด้วยการเข้ารหัสผ่านอัลกอริทึม SHA256 เพื่อนำไปใช้งานใน **Rails** แทนที่ **Webpack** ให้ได้ 

แต่นั้นก็ดูเป็นแค่วิธีการแก้ไขเฉพาะหน้าเท่านั้น เพราะดูเหมือนว่า JS Bundling แต่ละตัวก็เลือกอัลกอริทึมที่แตกต่างกัน และมีแนวทางพัฒนาที่แตกต่างกัน ทำให้การแก้ไขดังกล่าวอาจจะไม่ถูกยอมรับ และไม่ถูก PR เข้ากับรีโปของโค้ดหลักก็ได้ เพราะด้วยความที่มีคนเจอปัญหาเช่นเดียวกัน เลยทำให้เกิด [PR](https://github.com/rails/sprockets/pull/714) ที่จะตรวจสอบไฟล์ assets ถ้าหากไฟล์ใดมีการเข้ารหัสถูกต้องตามอัลกอรีทึมที่ถูกต้องแล้ว เช่น MD5, SHA1, SHA256 เป็นต้น ก็จะไม่จำเป็นต้อง fingering ซ้ำเข้าไปในชื่อไฟล์

สำหรับอัพเดตล่าสุด คือในส่วนของ [PR](https://github.com/rails/sprockets/commit/3d1171d8df151547cf160f393a7a09184abc19b5) ที่จะทำการตรวจสอบไฟล์ assets และพบว่ามีรูปแบบ `[hash].digested.[ext]` ก็จะไม่ทำการ fingering ไฟล์ซ้ำเข้าไปด้วย ซึ่งทำให้เราสามารถใช้ **Rollup** หรือ ​**esbuild** ได้เลย เพียงแต่เราอาจจะต้องแก้ไขค่ากำหนดตอนคอมไพล์ของแต่ละตัวเล็กน้อย


```javascript
// rollup.config.js
export default {
  input: 'app/javascript/application.js',
  output: {
    dir: 'app/assets/builds',
    format: 'es',
    chunkFileNames: '[name]-[hash].digested.js'
  }
}
```

```javascript
// esbuild.js
require('esbuild').build({
  entryPoints: ['app/javascript/application.js'],
  bundle: true,
  outdir: 'app/assets/builds',
  splitting: true,
  format: 'esm',
  chunkNames: '[name]-[hash].digested',
})
```

## References
- [Do not fingerprint if filename contains a valid digest #714](https://github.com/rails/sprockets/pull/714)
- [Improve detection of files already digested #718](https://github.com/rails/sprockets/pull/718)
- [esbuild#chunk-names](https://esbuild.github.io/api/#chunk-names)
- [rollup#outputchunkfilenames](https://rollupjs.org/guide/en/#outputchunkfilenames)
