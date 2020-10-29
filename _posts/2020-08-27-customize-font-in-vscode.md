---
layout: post
title: แต่งฟ้อนต์ใน VSCODE แบบใช้งานจริง
author: Karn
tags:
  - vscode
  - font
categories: dev
cover: "/assets/images/posts/2020/customize-font-in-vscode/cover.png"
image:
  path: "/assets/images/posts/2020/customize-font-in-vscode/cover.png"
date: 2020-08-27 17:59 +0700
---
ถ้าจะย้อนกลับไปที่[บทความ `แต่ง VSCode ให้น่าใช้ (ภาคฟ้อนต์)`](https://medium.com/@karn18/%E0%B8%A1%E0%B8%B2%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87-vs-code-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B9%83%E0%B8%8A%E0%B9%89-%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%9F%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%95%E0%B9%8C-598af704033c) การที่เราผสมผสานฟ้อนต์เข้าไปใน **VSCODE** ก็ดูเป็นอะไรที่น่าตื่นเต้น และดูว้าว แต่เวลาที่ใช้งานจริงกลับยังรู้สึกน่าหงุดหงิดในบางครั้งเวลาที่ **VSCODE** มีการอัพเดตใหม่ เราก็จะต้องมาคอย **enable extension** ใหม่ทุกครั้งไป ดังนั้นในบทความนี้จะแสดง **Settings** ของฟ้อนต์ที่ใช้งานจริงในการพัฒนาโปรแกรมบน **VSCODE** มาให้ดูกัน<!--more-->

สำหรับฟ้อนต์ที่ใช้งานหลักๆ ใน **VSCODE** ก็จะมีด้วยกัน 3 ตัว โดยจะสลับไปมาแล้วแต่อารมณ์ในช่วงนั้นๆ ซึ่งประกอบไปด้วย
- [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono)
- [Cascadia](https://github.com/microsoft/cascadia-code)
- [Fira Code](https://github.com/tonsky/FiraCode)

และที่ขาดไม่ได้ก็คงจะเป็นฟ้อนต์ไทย ซึ่งก็เอาไว้ใช้สำหรับเขียนคอมเมนต์ โน๊ตต่างๆ หรือเขียนบล็อกนี่เอง โดยผมจะใช้ฟ้อนต์[ใบจามจุรี](https://fonts.google.com/specimen/Bai+Jamjuree)

เมื่อติดตั้งฟ้อนต์ต่างๆ เรียบร้อยทีนี้ก็เข้าไป **config** ใน **VSCODE** ดังแสดงในภาพด้านล่าง

![config](/assets/images/posts/2020/customize-font-in-vscode/config1.png){:width="600px"}

จะเห็นได้ว่าเราจะกำหนดฟ้อนต์หลักที่จะใช้งานไว้เป็นตัวแรก และกำหนดฟ้อนต์ไทยไว้เป็นตัวถัดมา ที่ทำแบบนี้ก็เพราะเวลาที่ **VSCODE** แสดงผลเลือกใช้งานฟ้อนต์ตามลำดับที่เรากำหนด และเมื่อได้ฟ้อนต์ที่เลือกใช้ไม่รองรับอักษรขระที่แสดงผล ก็จะ **fallback** ไปเลือกฟ้อนต์ตัวถัดๆ ไป จึงทำให้ **VSCODE** ของเราสามารถที่จะแสดงตัวอักษรภาษาอังกฤษด้วยฟ้อนต์ **Cascadia** และแสดงตัวอักษรไทยด้วยฟ้อนต์ **Bai Jamjuree** ได้

![example](/assets/images/posts/2020/customize-font-in-vscode/example.png){:width="600px"}

🎉 สำหรับผู้ที่ใช้งาน **Mac** หรือ **Linux** และมีการใช้งาน **oh-my-zsh** และ **[powerlevel10k](https://github.com/romkatv/powerlevel10k)** ก็จะประสบปัญหาการแสดงผล **Powerline Font** ใน **terminal** ของ **VSCODE** ซึ่งเราจะเห็นรูปไอคอนต่างๆ เป็นสี่เหลี่ยมไปหมดเลย

![missing_powerline](/assets/images/posts/2020/customize-font-in-vscode/missing_powerline.png){:width="600px"}

เราสามารถแก้ไขได้ง่ายๆ คือการเพิ่มฟ้อนต์ `MesloLGS NF` เข้าไปหลังฟ้อนต์หลักที่ใช้งาน

![missing_powerline](/assets/images/posts/2020/customize-font-in-vscode/config2.png){:width="600px"}

ทันทีที่ใส่ฟ้อนต์เพิ่มเข้าไปไอคอนที่เป็นเหลี่ยมอยู่ ก็แสดงเป็นไอคอนต่างๆ ที่สวยงาม

![missing_powerline](/assets/images/posts/2020/customize-font-in-vscode/fix_powerline.png){:width="600px"}

## References
- [https://github.com/JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono)
- [https://github.com/microsoft/cascadia-code](https://github.com/microsoft/cascadia-code)
- [https://github.com/tonsky/FiraCode](https://github.com/tonsky/FiraCode)
- [https://fonts.google.com/specimen/Bai+Jamjuree](https://fonts.google.com/specimen/Bai+Jamjuree)
- [https://ohmyz.sh](https://ohmyz.sh)
- [https://github.com/romkatv/powerlevel10k](https://github.com/romkatv/powerlevel10k)
