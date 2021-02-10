---
layout: post
title: ตรวจสอบข้อมูลก่อนบันทึก (Validations)
author: Karn
tags:
- rails
- ruby
- validations
categories: dev
cover: "/assets/images/posts/2021/rails-validations/cover.png"
image:
  path: "/assets/images/posts/2021/rails-validations/cover.png"
  width: 1200
  height: 630
date: 2021-01-27 22:43 +0700
---
โดยทั่วไปเวลาที่เราสร้าง **Model** สำหรับการเก็บข้อมูลลงฐานข้อมูล จะมีเงื่อนไขบังคับในแต่ละฟิลด์อยู่ (**Constraint**) ไม่ว่าจะเป็นฟิลด์ต้องไม่เป็นค่าว่างหรือ null บ้างก็ฟิลด์จะต้องเป็นตัวอักษรขนาดไม่เกิน 50 ตัวอักษร หรือฟิลด์ต้องจำนวนนับทศนิยมได้ไม่เกิน 2 ตำแหน่ง เป็นต้น ที่นี้เมื่อเราใช้งาน **ActiveRecord** จะมีการเขียน **Validations** ไว้อีกรอบเพื่อให้มั่นใจว่าข้อมูลที่จะเราจะทำการบันทึกลงฐานข้อมูลนั้นถูกต้องตามเงื่อนไขที่ได้กำหนด<!--more--> และแน่นอนว่าเมื่อโลจิกของโปรแกรมเริ่มมีความซับซ้อนขึ้น เงื่อนไขในการตรวจสอบก็ย่อมจะซับซ้อนขึ้นตาม ซึ่งการใช้ built-in **Validations** ไม่สามารถตอบโจทย์ได้ ทำให้เราจะต้องสร้าง **Validator** ของเราขึ้นมาเอง ซึ่งก็ทำได้ไม่ยากมาดูกันเลย

## โจทย์
สำหรับโจทย์วันนี้ที่เราจะแก้ไขก็มาจากที่ว่า โปรแกรมที่พัฒนาจะมีการบันทึกข้อมูลคนไข้เยี่ยมบ้าน ซึ่งในแต่ละปีงบประมาณจะอนุญาตให้สร้างคนไข้เยี่ยมบ้านที่มีเลขบัตรประชาชนซ้ำกันเกิดขึ้นไม่ได้โดยอ้างอิงจากวันที่สำรวจ ซึ่งหน้าตาของตาราง Patient นั้นก็เป็นดังตารางด้านล่าง (เอามาเฉพาะบางฟิลด์เท่านั้นนะ)

### ตาราง Patient

id | pid | first_name | surveyed_date | created_at | updated_at
--- |--- | ---
1| 183xxxxxxx515 | demo | 2020-08-19 | 2020-08-19 | 2020-08-19 11:05:57
2| 183xxxxxxx515 | demo | 2021-05-02 | 2021-05-02 | 2021-05-02 14:27:12

จากตารางจะพบว่าเราสามารถบันทึกข้อมูลคนไข้เยี่ยมบ้านที่มีเลขบัตรประชาชนซ้ำกันได้ก็ต่อเมื่อวันที่เยี่ยมบ้าน (surveyed_date) จะต้องอยู่คนละปีงบประมาณกัน
แถวแรกจะเป็นปีงบประมาณ 2563 (1 ตุลาคม 2562 - 20 กันยายน 2563) และแถวที่สองเป็นปีงบประมาณ 2564 (1 ตุลาคม 2563 - 30 กันยายน 2564)

-----

ก่อนจะไปถึงวิธีแก้ไขโจทย์ของเรา ถ้าย้อนกลับไปเป็นโจทย์ที่ว่าเราสามารถบันทึกข้อมูลคนไข้ซ้ำกันไม่ได้เลย การตรวจสอบข้อมูลก็สามารถเขียนได้ดังนี้

```ruby
class Patient
  validates :pid, uniqueness: true
end
```

ที่นี้ก็มาสร้าง **Validator** ของเรากันเลย ก็สามารถทำได้ง่ายๆ โดยการสร้าง class ที่สืบทอดความสามารถต่อจาก class `ActiveModel::Validator` และก็ต้อง implement เมธอดที่ชื่อ `validate`

### app/validators/patient_validator.rb

```ruby
class PatientValidator < ActiveModel::Validator
  def validate(record)
    budget_year = current_budget_year
    results = record.class.name.constantize.where("pid = :pid and extract(year from surveyed_date) = :budget_year", pid: record.pid, budget_year: budget_year)

    record.errors.add :pid, :duplicated_pid_per_budget_year unless results.size.zero?
  end
end
```

ในกรณีที่เราเขียนเงื่อนไขตรวจสอบแล้วไม่ถูกต้อง เราจะทำการเพิ่ม error เข้าไปใน `record.errors` ซึ่งก็จะระบุฟิลด์ กับข้อความที่จะแสดง แต่ถ้าไม่มีอะไรผิดผ่านเราก็ปล่อยผ่านไปเลย ทันทีที่โมเดลเราทำการตรวจสอบด้วย `valid?` และพบว่ามี errors ปรากฏอยู่ข้อมูลก็จะไม่บันทึกลงในฐานข้อมูล

สำหรับวิธีการเรียกใช้ **PatientValidator** ก็สามารถทำได้ดังนี้

```ruby
class Patient
  # แบบแรก
  validates_with PatientValidator

  # แบบที่สอง
  validates :once_in_budget_year

  def once_in_budget_year
    validates_with PatientValidator
  end
end
```

เพียงเท่านี้เราก็สามารถตอบโจทย์เราได้แล้ว แต่ถ้าเราลองพิจารณาเพิ่มไปอีกนิดจะพบว่าถ้าเราเพิ่มฟิลด์ **budget_year** เข้าไปในตารางก็น่าจะทำให้การตรวจสอบทำได้โดยไม่ต้องสร้าง **Validator** ใหม่ขึ้นมาได้ และโค้ดของเราก็จะเป็นประมาณนี้

```ruby
class Patient
  validates :pid, uniqueness: { scope: :budget_year,
    message: "Should happen once per budget year" }
end
```

## References
- [Validations](https://guides.rubyonrails.org/active_record_validations.html)
