---
layout: post
title: How to use pnpm instead of yarn to compile assets on Rails
description: |
  เมื่อ jsbundling-rails ผูกติดอยู่กับ yarn แต่เราต้องการจะใช้ pnpm แทนสำหรับการคอมไพล์
  assets เพื่อใช้ใน production จะทำได้อย่างไรมาดูกัน
author: Karn
tags:
- rails
- jsbundling
- LFP
categories: dev
twitter:
  card: summary_large_image
image:
  path: https://surfup.karn.work/covers/835ddb9c80/2e86cd28aa.png
  width: 1200
  height: 630
date: 2022-03-29 18:55 +0700
---
นักพัฒนาที่ใช้งาน **NodeJS** และ **npm** ย่อมรู้จักกับ **node_modules hell** เป็นอย่างดี ยิ่งเราติดตั้ง package เยอะเท่าไหร่ขนาดของโฟลเดอร์ **node_modules** ก็จะยิ่งใหญ่โตตามไปด้วยเท่านั้น ด้วยการจัดการ dependencies ของ **npm** ซึ่งทำได้ไม่ดีนัก ทำให้มี package management ตัวอื่นๆ ถูกพัฒนาขึ้นมาเพื่อทดแทนทั้งในเรื่องประสิทธิภาพและขนาดของโฟลเดอร์

เมื่อเราใช้งาน **[jsbundling-rails](https://github.com/rails/jsbundling-rails)** ใน **Rails** พบว่า package management ที่ถูกผูกไว้ตอน `assets:precompile` จะเป็น **yarn** ซึ่งจะเห็นได้จากโค้ด [build.rake](https://github.com/rails/jsbundling-rails/blob/main/lib/tasks/jsbundling/build.rake) ดังนั้นถ้าเราต้องการเปลี่ยนไปใช้ **pnpm** หรือ package management ตัวอื่นเราจำเป็นจะต้อง override task ดังกล่าวดังแสดงในโค้ดด้านล่าง

```ruby
# lib/tasks/build.rake
namespace :pnpm do
  desc "Build your JavaScript bundle"
  task :build do
    # Using pnpm instead of yarn
    unless system "pnpm install && pnpm run build"
      raise "Command build failed, ensure pnpm is installed and `pnpm run build` runs without errors"
    end
  end
end

  # Clear javascript:build task
Rake::Task["javascript:build"].clear
if Rake::Task.task_defined?("assets:precompile")
  Rake::Task["assets:precompile"].enhance(["pnpm:build"])
end

if Rake::Task.task_defined?("test:prepare")
  Rake::Task["test:prepare"].enhance(["pnpm:build"])
elsif Rake::Task.task_defined?("db:test:prepare")
  Rake::Task["db:test:prepare"].enhance(["pnpm:build"])
end
```

เพียงเท่านี้เราก็สามารถใช้ **pnpm** ในการคอมไฟล์ assets ได้แล้วเมื่อเรารันคำสั่ง `rails assets:precompile`

## ตัวอย่างขนาดไฟล์เมื่อใช้ pnpm เปรียบเทียบกับ npm

![](/assets/images/posts/2022/how-to-use-pnpm-instead-of-yarn-to-compile-assets-on-rails/npm.png){:width="400px"}
*node_modules จาก npm*

![](/assets/images/posts/2022/how-to-use-pnpm-instead-of-yarn-to-compile-assets-on-rails/pnpm.png){:width="400px"}
*node_modules จาก pnpm*

จากภาพจเป็นขนาดที่ได้จากการใช้ **npm** และ **pnpm** โดยใช้โปรเจ็คเดียวกัน ซึ่งก็จะเห็นได้อย่างชัดเจนว่าขนาดของ **node_modules** ที่สร้างจาก **pnpm** มีขนาดเล็กกว่า **npm** พอสมควร ทั้งนี้ขนาดที่แตกต่างๆ กันก็ขึ้นอยู่กับ package ที่ใช้ว่ามี dependencies ผูกกันมากน้อยเพียงใดด้วย

## References
- [pnpm](https://github.com/pnpm/pnpm)
