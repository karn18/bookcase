---
layout: post
title: ติดตั้ง gem และ node module จาก private repository
author: Karn
tags:
- gem
- node
- module
categories: dev
cover: "/assets/images/posts/2021/installing-gem-and-node-module-from-private-git-reposity/cover.png"
image:
  path: "/assets/images/posts/2021/installing-gem-and-node-module-from-private-git-reposity/cover.png"
  width: 1200
  height: 630
date: 2021-01-29 22:40 +0700
---
คงจะเป็นสิ่งที่หลีกเลี่ยงไม่ได้ที่เราพยายามจะลดเวลาในการพัฒนาโปรแกรมอันใหม่ขึ้นมา ซึ่งวิธีหนึ่งก็คือการเลือกใช้ library ต่างๆ ที่เป็นแบบ public หรือ lib ที่เราพัฒนาขึ้นมาเองและเก็บเอาไว้ใน git repository แบบ private<!--more-->

สำหรับ lib ที่เป็นแบบ private ส่วนมากจะก็เก็บอยู่บน hub ของแต่ละ framework ที่ใช้โดยการพัฒนาโปรแกรมโดยใช้ **Rails** จะมี lib ที่ต้องใช้ด้วยกัน 2 ฝั่งคือ

1. Backend เป็นภาษา Ruby จะใช้ gem เข้าไปหาได้ที่ [RubyGem](https://rubygems.org)
2. Frontend เป็นภาษา JavaScript จะใช้ node module เข้าไปหาได้ที่ [NPM](https://www.npmjs.com/)

> โดยส่วนมากก็จะเป็น Open Source และเก็บเอาไว้ใน GitHub

ที่นี้ก็มาถึง lib ที่เป็นของเราเองที่พัฒนาขึ้นแบบส่วนตัว ภายใต้องค์กรหรือบริษัท ซึ่งจะถูกเก็บเอาไว้อยู่ใน git repository ต่างๆ ไม่ว่าจะเป็น GitHub, Gitlab, BitBucket โดยจะมีการกำหนดสิทธิ์ในการเข้าถึงได้แบบ private ทำให้เราไม่สามารถเข้าถึงได้ ถ้าไม่ได้ sign-in เข้าไปซะก่อน ดังนั้นเราจะต้องทำการสร้าง **access token** ขึ้นมา เพื่อใช้ในการติดตั้งโดยเฉพาะ และแน่นอนว่า git repostiory ที่กล่าวไปข้างต้นมี feature นี้อยู่ 

สำหรับในบทความนี้ผมก็ขอยกตัวอย่างเป็น **GitLab** แล้วกันเพราะทางองค์กรใช้ตัวนี้เป็นหลักในการทำงาน โดยก่อนอื่นเราจะต้องเข้าไปสร้าง **access token** ขึ้นมา ให้เราเข้าไปที่ profile ของตัวเอง จากนั้นสังเกตที่เมนูด้านซ้ายมือ และเข้าไปที่ Access Token

- ให้เรากำหนดชื่อที่ตัวเองชอบ และเข้าใจว่าจะใช้ทำอะไร
- กำหนดวันหมดอายุ ถ้าขี้เกียจต้องมา revoke ก็ไม่ต้องใส่ค่า token ตัวนี้จะไม่มีวันหมดอายุ
- เลือกสิทธิการเข้าถึงเป็นแบบ `read_repository` ก็ให้เข้าไปอ่านได้อย่างเดียวก็พอแล้ว
- กดสร้าง **access token**
- ❗️ตรงนี้สำคัญ❗️ ให้ copy token ที่ถูกสร้างขึ้นมาเก็บเอาไว้ให้ดี เพราะเราจะไม่ได้เห็นมันอีกแล้ว

![Create Access Token](/assets/images/posts/2021/installing-gem-and-node-module-from-private-git-reposity/create-access-token.png)
*สร้าง Access Token*

## การติดตั้ง Gem

ให้เราใส่ gem ที่จะใช้งานเข้าไปใน `Gemfile` เพียงแต่สิ่งที่ต้องทำเพิ่มคือการระบุที่อยู่ที่เป็น private repository เข้าไปด้วย และที่สำคัญเราจะต้องเอา **access token** ที่ได้เมื่อกี้แนบไปพร้อมกับ account ที่ใช้ด้วย

**ยกตัวอย่าง** ให้ account ที่ใช้งานเป็น `karn` มี access token เป็น `JNb1ri7fWfAPbBwqaSD` และ git repo สามารถเข้าถึงได้ผ่าน url `https://gitlab.opensource-technology.com/All-OST/Add-on-Apps/latias-auditor.git` เราก็จะประกอบร่างเป็นดังโค้ดด้านล่าง

### Gemfile
```ruby
gem "latias-auditor", git: 'https://karn:JNb1ri7fWfAPbBwqaSD@gitlab.opensource-technology.com/All-OST/Add-on-Apps/latias-auditor.git'
```

ติดตั้ง gem ผ่าน `bundle install`

## การติดตั้ง Node Module

มาดูในฝั่ง Frontend กันบ้าง ถ้าเป็น Node ก็ต้องใส่เข้าไปใน `package.json` และเช่นกันรูปแบบการใช้งานก็คล้ายคลึงกับด้านบน เพียงแต่ปกติที่เราจะระบุเลข version ตามหลังชื่อ module ก็ให้ใส่เป็น url แทน ❗️ระวังนิดหนึงคือ protocal ที่ใช้จะต้องเป็น `git+https` หรือถ้าใครใช้ ssh ก็จะเป็น `git+ssh` อ่านเพิ่มเติมได้จากลิงค์ด้านล่างนะ

### package.json
```json
{
  "name": "YOUR-PROJECT",
  "dependencies": {
    "latias-date-format": "git+https://karn:JNb1ri7fWfAPbBwqaSD@gitlab.opensource-technology.com/All-OST/Add-on-Apps/latias-date-format.git",
  }
}
```

> ไม่ต้องห่วงว่า account กับ access token ที่อยู่ในตัวอย่างจะเข้าถึงโค้ดได้จริงนะครับ แต่ถ้าเผอิญเกิดเข้าได้จริงก็แจ้งมาด้วยแล้วกันนะ

เพียงเท่านี้ก็เรียบร้อย เราสามารถที่จะติดตั้ง lib ของเราจาก private git repository ได้

## References
- [Gemfile](https://bundler.io/man/gemfile.5.html)
- [NPM Packages and Modules](https://docs.npmjs.com/about-packages-and-modules)
