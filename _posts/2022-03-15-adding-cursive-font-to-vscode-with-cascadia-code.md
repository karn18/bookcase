---
layout: post
title: เพิ่มฟ้อนต์ตัวเขียนให้กับ VS Code ด้วย Cascadia Code
description: อยากจะให้ VS Code ของเราแสดงฟ้อนต์ตัวเขียนและฟ้อนต์ตัวพิมพ์คู่กัน เพียงเปลี่ยนมาใช้ฟ้อนต์
  Cascadia Code และกำหนดค่าอีกนิดหน่อยแค่นี้ก็สิ้นเรื่อง
author: Karn
tags:
- vscode
- font
categories: dev
twitter:
  card: summary_large_image
image:
  path: "/assets/images/posts/2022/adding-cursive-font-to-vscode-with-cascadia-code/cover.png"
  width: 1200
  height: 630
date: 2022-03-15 11:47 +0700
---
โดยส่วนตัวแล้วชอบที่จะให้ editor ที่ใช้งานแสดงฟ้อนต์ตัวเขียนกับฟ้อนต์ตัวพิมพ์ร่วมกันตอนเขียนโค้ด ถ้าจะย้อนกลับไปก็เคยแต่ง **VS Code** โดยใช้ **Custom CSS** ให้ใช้ฟ้อนต์ Fira Code กับฟ้อนต์ Victor Mono แต่นั้นก็ยุ่งยากเวลาใช้งาน

บทความนี้เราจะใช้ฟ้อนต์ **Cascadia Code** ซึ่งเป็นฟ้อนต์จาก Microsoft ที่ถูกพัฒนาขึ้นให้รองรับทั้งตัวพิมพ์ และตัวเขียนเลยทีเดียว ซึ่งจะทำให้เราสามารถแสดงฟ้อนต์ได้ดังตัวอย่างด้านล่าง

![](/assets/images/posts/2022/adding-cursive-font-to-vscode-with-cascadia-code/example.png){:width="500px"}
*Example*

ก่อนอื่นก็ติดตั้ง **[Casadia Code](https://github.com/microsoft/cascadia-code)** จากนั้นก็เปิด `settings.json` ของ **VS Code** และกำหนดค่าดังนี้

```json
  "editor.fontFamily": "'Cascadia Code', 'IBM Plex Sans Thai Looped'",
  "editor.fontLigatures": "'calt', 'ss01'",
  "editor.tokenColorCustomizations": {
    "textMateRules": [
      {
        "scope": [
          "comment",
          "entity.name.type.class", // class names
          "keyword", // import, export, return…
          "storage.modifier", // static keyword
          "storage.type", // class keyword
          "support.class.builtin",
          "keyword.control",
          "constant.language",
          "entity.other.attribute-name",
          "string.quoted.single",
          "entity.name.method",
          "entity.name.tag"
        ],
        "settings": {
          "fontStyle": "italic"
        }
      }
    ]
  }
```

ในที่สุดเราก็ได้ใช้ editor ที่ใช้ฟัอนต์ถูกใจเราสักที 🤘 ✍🏼 ❤️

## References
- [แต่ง VS Code ให้น่าใช้ (ภาคฟ้อนต์)](https://karn18.medium.com/%E0%B8%A1%E0%B8%B2%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87-vs-code-%E0%B9%83%E0%B8%AB%E0%B9%89%E0%B8%99%E0%B9%88%E0%B8%B2%E0%B9%83%E0%B8%8A%E0%B9%89-%E0%B8%A0%E0%B8%B2%E0%B8%84%E0%B8%9F%E0%B9%89%E0%B8%AD%E0%B8%99%E0%B8%95%E0%B9%8C-598af704033c)
- [How to add ligatures and cursive fonts to VS Code](https://www.ankursheel.com/blog/add-cursive-fonts-to-vs-code)