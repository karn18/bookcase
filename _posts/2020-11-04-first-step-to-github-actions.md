---
layout: post
title: ก้าวแรกกับการใช้ GitHub Actions
author: Karn
tags:
- ruby
- github
- actions
categories: dev
date: 2020-11-04 11:54 +0700
---
**GitHub Actions** เป็นเครื่องมือ **CI/CD** หนึ่งที่จะช่วยให้เราทำงานแบบ **automation** ได้ หวังว่าบทความจะเป็นก้าวแรกที่จะจุดประกายให้นำ **automation tools** ต่างๆ เข้าไปใช้ในโปรเจ็คกัน สำหรับตัวอย่างในบทความนี้ก็จะเป็นโจทย์ง่ายๆ ที่จะใช้ **Actions** ในการทดสอบโปรแกรมหลังจากที่ **push code** ขี้นไป รวมถึงมีการตรวจสอบความครอบคลุมในการทดสอบด้วย **Codecov** และจะแสดง **badge** แสดงสถานะที่เกิดขึ้นไว้ด้วย<!--more-->

## ตัวอย่างที่สำเร็จแล้ว

![Ruby Actions](/assets/images/posts/2020/first-step-to-github-actions/ruby-actions.png)
*[Ruby Actions](https://github.com/karn18/ruby-actions)*

## เริ่มต้นกันเลย
- สร้างโปรเจค เขียนเทส และก็โค้ด
- สร้าง repository บน **GitHub** และอัพโหลดโค้ดขึ้นไป
- เข้าไปที่เมนู **Actions** จากนั้นก็เลือก **Workflows** ที่จะใช้งาน อันนี้ก็ขึ้นอยู่กับภาษาที่ใช้ สำหรับของผมก็จะเลือกใช้ **Workflow สำหรับ Ruby** 

![RA1](/assets/images/posts/2020/first-step-to-github-actions/ra-1.png)

- โดยเบื้องต้นเมื่อกด setup ก็จะมีการสร้างไฟล์ yml ตามชื่อภาษาที่เราใช้ หรือเราสามารถเปลี่ยนชื่อก็ได้ และสร้างไว้ในโฟลเดอร์ `.github/workflows` จากนั้นก็ปรับค่าต่างๆ เช่น 
  - event ที่จะใช้ trigger ให้ทำงาน ซึ่งสนใจเฉพาะการ push โค้ดเข้ามาที่ branch **main** เท่านั้น
  - job ที่ระบุไว้ใน workflow นี้จะมีแค่ test เท่านั้น แต่จะเห็นว่าในการ test ประกอบไปด้วย step หลายๆ step ด้วยกัน

![RA2](/assets/images/posts/2020/first-step-to-github-actions/ra-2.png){:width="440px"}

- กดบันทึกไฟล์ workflow จากนั้นจะเห็นว่า **GitHub Actions** เริ่มทำงานโดยอัตโนมัติในการทดสอบโค้ดให้กับเรา

![RA3](/assets/images/posts/2020/first-step-to-github-actions/ra-3.png)

- เพิ่ม step ให้กับ workflow ของเราให้อัพโหลด code covergage ไปยัง **codecov.io**

![RA3](/assets/images/posts/2020/first-step-to-github-actions/ra-4.png)

- เราสามารถเพิ่ม cache ให้กับ workflow ได้ด้วยเช่นกัน เพื่อให้การการทำงานดีขึ้น

![RA3](/assets/images/posts/2020/first-step-to-github-actions/ra-5.png)

- สุดท้ายก็ใส่ badge เข้าไปที่ **README** เพื่อใช้แสดงสถานะปัจจุบันของโค้ดเราว่าทดสอบผ่านหรือไม่ รวมถึง code coverage ได้กี่เปอร์เซนต์

## References
- [GitHub Actions](https://github.com/features/actions)
- [Actions Cache](https://github.com/actions/cache)
- [Codecov](codecov.io/)
- [ตัวอย่างการใช้ GitHub Actions](https://github.com/karn18/ruby-actions)
