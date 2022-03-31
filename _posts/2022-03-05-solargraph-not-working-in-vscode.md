---
layout: post
title: Solargraph not working in VSCode
description: เมื่อ Solargraph ที่เราติดตั้งไม่ทำงานบน VSCode มีวิธีแก้ไขง่ายๆ โดยการแก้ไข solargraph.commandPath ใน Settings ให้ตรงกับที่อยู่ของ solargraph ผ่านคำสั่ง `which solargraph`
author: Karn
tags:
- ruby
- solargraph
- LFP
categories: dev
image:
  path: "/assets/images/posts/2022/solargraph-not-working-in-vscode/cover.png"
  width: 1200
  height: 630
date: 2022-03-05 16:38 +0700
---
**Solargraph** เป็นอีกหนึ่ง intellisense ในฝั่งของ **Ruby** ที่จะทำให้เราสามารถใช้งาน Autocomplete พร้อมกับแสดง Documentation ได้บน **VSCode** ที่เราใช้งานพร้อมๆ กัน

![](/assets/images/posts/2022/solargraph-not-working-in-vscode/solargraph-extension.png){:width="400px"}
*Solargraph Extension in VSCode*

![](/assets/images/posts/2022/solargraph-not-working-in-vscode/string-split.png){:width="600px"}
*String#split*

ทั้งๆ ที่เราติดตั้ง gem `solargraph` ไว้บนเครื่องแล้ว และติดตั้ง Ruby Solargraph Extension ไว้แล้ว แต่เมื่อเปิด **VSCode** ทีไร ก็จะมี Error ที่แจ้งว่าเรายังไม่พบ gem `solargraph` อยู่นั้นแหละ ทำให้ไม่สามารถใช้ Autocomplete ได้

![](/assets/images/posts/2022/solargraph-not-working-in-vscode/solargraph-not-found.png){:width="500px"}
*Solargraph Gem Not Found*

ซึ่งวิธีแก้ไขก็คือให้เข้าไปแก้ไข **path** ของ solargraph.commandPath ใน Settings ให้ตรงกับ **path** ที่เรียกจากคำสั่ง `which solargraph`

```
$ which solargraph
/Users/karn/.rbenv/shims/solargraph
```

![](/assets/images/posts/2022/solargraph-not-working-in-vscode/solargraph.commandPath.png){:width="600px"}
*Solargraph#Command Path*

# References
- [Solargraph](https://solargraph.org)
- [https://stackoverflow.com/questions/55869119/solargraph-not-working-in-visual-studio-code](https://stackoverflow.com/questions/55869119/solargraph-not-working-in-visual-studio-code)