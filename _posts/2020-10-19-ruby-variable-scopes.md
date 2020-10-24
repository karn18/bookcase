---
layout: post
title: Variable Scopes
author: Karn
tags:
   - ruby
   - 101
categories: dev
cover: "/assets/images/posts/2020/ruby-variable-scopes/cover.jpg"
image:
  path: "/assets/images/posts/2020/ruby-variable-scopes/cover.jpg"
  width: 1200
  height: 866
date: 2020-10-19 17:32 +0700
---
สำหรับ **Ruby** การใช้งาน **Class Variable** และ **Instance Variable** จะมีความแตกต่างจากภาษาอื่นๆ นิดหน่อยลองมาดูกัน

## Syntax
```ruby
@@class_variable    # Class scope, static across all class intances
@instance_variable  # Class object scope, value specific to object instance
```

- **Class Variable** เป็นตัวแปรที่ผูกติดอยู่กับคลาส ใช้สำหรับเก็บข้อมูลเพื่อแชร์กันภายในคลาส
- **Instance Variable** ก็จะเป็นตัวแปรที่ใช้เก็บข้อมูล โดยจะแยกออกจากกันระหว่างออปเจ็คที่ถูกสร้างขึ้นมา (**Instance**)

ทำความเข้าใจเพิ่มเติมได้จากโค้ดด้านล่าง

```ruby
class Customer
   @@no_of_customers = 0
   def initialize(id, name, addr)
      @cust_id = id
      @cust_name = name
      @cust_addr = addr
   end

   def display_details()
      puts "Customer id #@cust_id"
      puts "Customer name #@cust_name"
      puts "Customer address #@cust_addr"
   end

   def total_no_of_customers()
      @@no_of_customers += 1
      puts "Total number of customers: #@@no_of_customers"
   end
end

# Create Objects
cust1 = Customer.new("1", "John", "Wisdom Apartments, Ludhiya")
cust2 = Customer.new("2", "Poul", "New Empire road, Khandala")

# Call Methods
cust1.total_no_of_customers()   # Total number of customers: 1
cust2.total_no_of_customers()   # Total number of customers: 1
```

> สำหรับ Ruby จะแปลกๆ นิดหนึ่งตรงที่ไม่ว่าจะเป็นตัวแบบ Class หรือ Instance จะไม่สามารถเข้าถึงได้ตรงถึงตัวแปรจากภายนอกได้ ต้องสร้าง accessor method ขึ้นมาไว้เรียกผ่าน

ถ้าเราอยากจะเข้าถึงค่า `@@no_of_customers` จะต้องสร้างเมธอดขึ้นมาเป็นตัวกลางในการเข้าถึงตัวแปร 

```ruby
def self.no_of_customers
  @@no_of_customers
end
```

หรือเรียกผ่าน **built-in method** ที่ชื่อว่า `Class.class_variable_get` ก็ได้
เช่นเดียวกันสำหรับ **Instance Varible** ทั้ง 3 ตัวก็จะต้องใช้วิธีการเดียวกัน เพียงแต่ใน **ruby** จะมีเมธอดอำนวยความสะดวกในการเข้าถึงอยู่ โดยวันนี้เราจะใช้ `attr_reader` (**ruby** จะมีชุดเมธอดที่เรียก **accessor** อยู่เอาไว้อธิบายกันในบทความหน้านะครับ)

```ruby
...
attr_reader :cust_id, :cust_name, :cust_addr
```

เพียงเท่านี้เราก็สามารถเข้าถึงตัวแปรทั้ง 3 ตัวได้แล้ว 

```ruby
puts "#{cust1.cust_id}: #{cust1.cust_name} - #{cust1.cust_addr}"  # 1: John - Wisdom Apartments, Ludhiya
puts "Number of customer is #{Customer.no_of_customers}"          # Number of customer is 2
```

## References
- [https://syntaxdb.com/ref/ruby/class-variables](https://syntaxdb.com/ref/ruby/class-variables)
- [https://www.tutorialspoint.com/ruby/ruby_variables.htm](https://www.tutorialspoint.com/ruby/ruby_variables.htm)
- [class_variable_get](https://devdocs.io/ruby~2.6/module#method-i-class_variable_get)