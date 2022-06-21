---
layout: post
title: ติดตั้ง ruby 3.1.x บนเครื่อง Mac ด้วย rbenv ไม่สำเร็จ
author: Karn
tags:
- ruby
- rbenv
- LFP
categories: dev
twitter:
  card: summary_large_image
image:
  path: https://surfup.karn.work/covers/835ddb9c80/f8e237b5bd.png
  width: 1200
  height: 630
date: 2022-06-11 20:42 +0700
---
นานๆ ครั้งก็จะมีการอัพเดตเวอร์ชัน ​**Ruby** ที่ใช้งานอยู่ในเครื่องบ้าง ซึ่งปัจจุบันเวอร์ชันที่อัพเดตล่าสุดก็จะเป็น **3.1.2** ผ่านคำสั่ง `rbenv install -`

```bash
$ rbenv install -l
2.6.10
2.7.6
3.0.4
3.1.2
jruby-9.3.4.0
mruby-3.0.0
rbx-5.0
truffleruby-22.1.0
truffleruby+graalvm-22.1.0

Only latest stable releases for each Ruby implementation are shown.
Use 'rbenv install --list-all / -L' to show all local versions.
```

และติดตั้งผ่านคำสั่ง `rbenv install 3.1.2` ปรากฏว่าติดตั้งไม่ผ่าน ทั้งนี้ก็ได้ลองติดตั้งเวอร์ชันต่างๆ ที่เป็น **3.1.x** ล้วนติดตั้งไม่ผ่านทั้งหมด แต่ถ้าติดตั้งเวอร์ที่เป็น **3.0.x** กลับติดตั้งได้ผ่านฉลุย เลยได้ลองไป[โพสถามใน github ของ ruby-build](https://github.com/rbenv/ruby-build/discussions/1979) 

ดูเหมือนว่าเจ้าตัวการที่ทำให้ติดตั้งไม่ผ่านจะเป็นเรื่อง path ที่ใช้อ้างอิงไปยัง headers ในการคอมไพล์ไฟล์ดังที่ผู้ดูแลได้แจ้งเอาไว้ในโพส พร้อมทั้งได้บอกวิธีการใส่ option ในการคอมไพล์มาให้ จนสุดท้ายก็สามารถที่จะติดตั้ง **Ruby 3.1.2** ได้สำเร็จ

```bash
RUBY_CONFIGURE_OPTS="$RUBY_CONFIGURE_OPTS --disable-install-doc" rbenv install 3.1.2
```