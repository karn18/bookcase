---
layout: post
title: คำนวณเวลาอ่านบทความใน Jekyll โดยการตัดคำแบบไทย
date: 2019-12-04 09:00:00 +0700
author: "Karn"
tags:
  - ruby
  - python
  - thai nlp
categories: dev
cover: '/assets/images/posts/2019/customize-reading-time-with-thai-nlp/cover.png'
image:
  path: '/assets/images/posts/2019/customize-reading-time-with-thai-nlp/cover.png'
---

บทความนี้จะกล่าวถึงการคำนวณเวลาที่ใช้ในการอ่านบทความ ซึ่งในส่วนของ **Jekyll** จะมีปลักอินที่ชื่อ **liquid_reading_time** ที่ถูกนำมาใช้ในการคำนวณเวลาโดยเฉลี่ยในการอ่านบทความหนึ่งๆ และแสดงให้ผู้อ่านเห็น <!--more-->โดยมีสูตรที่ว่า

> จำนวนคำทั้งหมดในบทความ / ความเร็วเฉลี่ยในการอ่าน = ระยะเวลาในการอ่าน

ถ้าดูแล้วการใช้ปลักอินดังกล่าวก็ดูน่าจะตอบโจทย์แล้วใช่หรือไม่ **แต่**อย่าลืมว่าการนับจำนวนคำระหว่างภาษาไทยกับภาษาอังกฤษนั้นแตกต่างกัน กล่าวคือโดยปกติคำหนึ่งๆ ในภาษาอังกฤษจะถูกแยกจากกันด้วยช่องว่าง (whitespace) ส่วนภาษาไทยนั้นการแยกคำออกมานั้นมีความซับซ้อนกว่ามาก ดังนั้นการใช้ปลักอินที่ตัดคำโดยใช้ช่องว่างจึงไม่ตอบโจทย์

เอ๊ะแล้วอย่างงี้จะใช้ปลักอินตัวไหนมาช่วยในการตัดคำไทยดี ซึ่งต้องบอกเลยว่าถ้าหากใช้ **Ruby** อย่างเดียวนั้นคงเป็นไปได้ยาก เนื่องจากไลบราลีที่ใช้สำหรับตัดคำไทย**ไม่มีผู้พัฒนา**ในภาษา **Ruby** ทำให้ต้องไปเพิ่งไลบราลี [pythainlp](https://github.com/PyThaiNLP/pythainlp) ในภาษา **Python** แทน ซึ่งไลบราลีตัวนี้มีนักพัฒนาคนไทยช่วยกัน และเผยแพร่ให้นักพัฒนาคนอื่นๆ ได้ใช้งานกัน

ฉะนั้นในบทความนี้จะเป็นการรวมร่างกันทำงานระหว่างไลบราลี **liquid_reading_time** (Ruby) กับ **pythainlp** (Python) โดย
- **pythailnp** นำมาใช้ในการตัดคำภาษาไทยที่มาจากบทความ
- **liquid_reading_time** นำมาใช้ในการคำนวณระยะเวลาในการอ่าน

## ลงมือปรับแต่งกันเลย
- เริ่มต้นโดยการ fork ปลักอินมาก่อน โดยเข้าไปที่ [liquid_reading_time](https://github.com/bdesham/reading_time) แล้วก็ clone project มาไว้ยังเครื่องคอมพิวเตอร์ของเรา
- เข้าไปยังไฟล์ที่ชื่อ **lib/liquid_reading_time.rb** จากนั้นทำการเพิ่มโค้ดสำหรับเรียกใช้งานโปรแกรม **word_tokenizer.py** ผ่านฟังก์ชันที่ชื่อ **tokenize_words** และเปลี่ยนการเรียกใช้ฟังก์ชัน **count_words** ดังแสดงในโค้ดด้านล่าง

```ruby
  def count_words(html)
      tokenize_words(words(html).join(' ')) # Add this line
      # words(html).length # Comment this line
    end
  end

  ...
  # Add new method
  def tokenize_words(text)
    cmd = `python word_tokenizer.py "#{text}"`
    cmd.to_i
  end
```

- เข้าไปยังโฟลเดอร์เว็บไซด์ของเรา และทำการสร้างไฟล์ **word_tokenizer.py** ซึ่งเป็นโปรแกรมทีรับฟารามิเตอร์เป็นเนื้อหาของบทความ แล้วจะส่งคืนค่าจำนวนคำที่ตัดได้คืนกลับไป โดยผ่านการแสดงผลทาง stdout

```python
  import sys
  from pythainlp import sent_tokenize, word_tokenize

  if len(sys.argv) > 1:
      content = sys.argv[1]
      sys.stdout.write(str(len(word_tokenize(content, keep_whitespace=False))))
  else:
      sys.stdout.write('0')
  sys.exit(0)
```
- ทำการแก้ไข Gemfile ของ **liquid_reading_time** ให้โหลดจาก repo ของเราที่ได้ fork ออกมาแทน repo หลัก
- ทดสอบการประเมินเวลาของบทความกัน ซึ่งปรากฏว่าหลังจากเปลี่ยนมาใช้การตัดคำแบบไทยในการประเมินเวลาการอ่านบทความ จะได้ระยะเวลาในการประเมินที่ค่อนข้างใกล้เคียงกับเวลาที่ใช้อ่านจริง

![Reading Time](/assets/images/posts/2019/customize-reading-time-with-thai-nlp/reading_time_default.png){:width="400px"}
*ใช้ liquid_reading_time แบบปกติ*

![Custome Reading Time](/assets/images/posts/2019/customize-reading-time-with-thai-nlp/reading_time_with_thai_nlp.png){:width="400px"}
*ใช้ pythainlp ร่วมกับ liquid_reading_time*

*!!!* ทั้งนี้การตัดคำแบบไทยนั้นเหมาะที่จะนำมาใช้กับบทความที่มีเนื้อหาเป็นทั้งภาษาไทย และภาษาอังกฤษ แต่ถ้าในกรณีที่ผู้เขียนบล๊อกที่เน้นใช้เนื้อหาเป็นภาษาอังกฤษแต่เพียงอย่างเดียว ก็ไม่จำเป็นต้องปรับแต่งปลั๊กอินเพิ่มใดๆ

*!!!* ป.ล. การเรียกใช้งานโปรแกรมสำหรับตัดคำไทยจะทำให้ใช้ระยะเวลาในการแปลงไฟล์ Markdown ไปเป็น HTML นานขึ้นด้วย

## References:
- [pythainlp](https://github.com/PyThaiNLP/pythainlp)
- [liquid_reading_time](https://github.com/bdesham/reading_time)
