---
layout: post
title: Partial Form Validation with Stimulus
author: Karn
tags:
- rails
- ruby
- stimulus
categories: dev
twitter:
  card: summary_large_image
image:
  path: https://surfup.karn.work/covers/835ddb9c80/f8e237b5bd.png
  width: 1200
  height: 630
date: 2022-06-21 20:34 +0700
---
ปกติแล้วเราจะเลือกออกแบบให้การบันทึกข้อมูลใดๆ ก็ตามพยายามที่จะจำกัดอยู่ในหน้าเว็บเพียงหน้าเดียว และจะไม่ให้มัน scroll ยาวจนเกินไป แต่ในบางครั้งถ้าหากต้องทำการบันทึกข้อมูลที่ใหญ่มากๆ ก็ต้องแยกฟอร์มการบันทึกข้อมูลออกเป็นส่วนๆ ประกอบกับการออกแบบ UX/UI เพื่อให้ผู้ใช้งานเกิดความสะดวกที่สุด

สำหรับประเด็นในครั้งนี้ มาจากการที่ข้อมูลสำรวจที่จะทำการบันทึกมีปริมาณมาก และเราเลือกวิธีบันทึกข้อมูลแบบ Single-step Form ซึ่งนั้นทำให้ UI ของฟอร์มบันทึกมีขนาดยาวมากๆ ซึ่งในทีมเราก็มองว่าน่าจะส่งผลต่อประสบการณ์การใช้งาน เราจึงปรับเปลี่ยน UI ให้อยู่ในรูปของ Wizard แทนโดยจัดกลุ่มข้อมูล เพื่อให้ผู้ใช้งานกรอกข้อมูลเป็นส่วนๆ ดังแสดงในรูปด้านล่าง

![](/assets/images/posts/2022/partial-form-validation-with-stimulus/solution.png){:width="400px"}
*solution*

มื่อทำการแยกข้อมูลเป็นส่วนๆ และใช้ฟอร์มเพียงฟอร์มเดียวจะเกิดปัญหาการ validation เมื่อผู้ใช้งานทำการกดบันทึกฟอร์ม เพราะถ้าหาก input ตัวที่ validation ไม่ผ่าน แต่กลับถูกซ่อนอยู่ในแถบที่ผู้ใช้มองไม่เห็น ทำให้ผู้ใช้งานต้องกลับไปค้นหาในแถบทีละแถบเพื่อดูว่า input ตัวใดที่มีปัญหา 

ดังนั้นเราจึงเลือกเพิ่มการ validation เข้าไปในแต่ละแถบ ก่อนที่ผู้ใช้งานจะกดข้ามไปยังแถบถัดไปโดยใช้ **Stimulus** ผ่าน action ที่ชื่อ `next`

```javascript
next (_) {
  const inputs = this.containers[this.currentIndex].querySelectorAll("input")
  // Find first invalid input
  const invalidInput = Array.from(inputs).find(element => !element.checkValidity())
  if (invalidInput) {
    invalidInput.reportValidity()
  } else {
    this.currentIndex += 1
    this.activeIndex(this.currentIndex)
  }
}
```

โลจิกที่ใช้จะเป็นการดึงเฉพาะ input ที่อยู่ในแถบนั้นๆ ออกมา และเรียกผ่าน [Constraint Validation API](https://developer.mozilla.org/en-US/docs/Web/API/Constraint_validation) โดยที่ถ้าหากตรวจพบ input ใดๆ ตัวแรกที่ีไม่ผ่านก็ให้แสดง report ขึ้นทันที แต่ถ้าหากไม่พบ input ที่มีปัญหาก็จะข้ามไปยังแถบถัดไป

![](/assets/images/posts/2022/partial-form-validation-with-stimulus/partial-form-validation.gif){:width="600px"}
*Partial Form Validation*

อีกหนึ่งวิธีการที่สามารนำมาปรับใช้กับเหตุการณ์นี้ได้น่าจะเป็นการใช้ **Multi-step Forms** ซึ่งเราจะแยกแต่ละแถบเป็นฟอร์มแทน โดยแต่ละฟอร์มก็จะมี validation แยกออกจากกัน และบันทึกข้อมูลไปทีละส่วน อ่านได้จากบทความของ Jason เรื่อง [How to do multi-step forms in Rails](https://www.codewithjason.com/rails-multi-step-forms/) หรือจะนำ keyword ดังกล่าวค้นหาใน search engine เพื่อศึกษาเพิ่มเติมดูก็ได้
