---
layout: post
title: เปลี่ยน id ให้เป็น hash id บน URL
author: Karn
tags:
- rails
- ruby
- hashids
categories: dev
cover: "/assets/images/posts/2020/เปลี่ยน-id-ให้เป็น-hash-id-บน-url/cover.jpg"
image:
  path: "/assets/images/posts/2020/เปลี่ยน-id-ให้เป็น-hash-id-บน-url/cover.jpg"
  height: 100
  width: 100
date: 2020-06-09 23:04 +0700
---
ปกติเมื่อเราใช้ **rails generator** ในการสร้าง **CRUD** ไม่ว่าจะเป็น `scaffold` หรือ `scaffold_controller` จะพบว่า **resources** ที่ได้จะมีลักษณะคล้ายกับรูปด้านล่าง

<!--more-->

![Book Resources](/assets/images/posts/2020/เปลี่ยน-id-ให้เป็น-hash-id-บน-url/book_resources.jpg){:width="420px"}
*Book Resources*

กล่าวคือเวลาเข้าถึงหนังสือเล่มหนึ่งจะต้องเรียกผ่าน `/books/1` โดยที่เลข **id** ที่ถูกสร้างขึ้นก็จะเรียงกันไปเรื่อยๆ แบบนี้มันก็ง่ายในการสุ่มเข้าถึงหนังสือเล่มอื่นๆ วิธีการเช่นนี้อาจจะไม่เหมาะนักสำหรับนำไปใช้งานจริง ทีนี้เรามาลองเปลี่ยน **id** ให้เป็น **hash id** กันเพื่อให้การเข้าถึงข้อมูลปลอดภัยมากขึ้น

ก่อนอื่นเริ่มโดยการติดตั้ง **hashids** ซึ่งเป็น **gem** สำหรับสร้าง **hash** จากตัวเลข

```ruby
gem 'hashids'
```

สร้าง **Secret Class** สำหรับจัดการแทนการเรียก **hashids** ตรงๆ

```ruby
require 'hashids'

module Hashable
  module ClassMethods
    def hashids
      @hashids ||= Hashids.new "secret-book", 8
    end

    def encode(id)
      hashids.encode(id)
    end

    def decode(text)
      hashids.decode(text).first
    end
  end

  def self.included(base)
    base.extend(ClassMethods)
  end
end

class Secret
  include Hashable
end
```

ทำการ **override** เมธอด `to_param` เพื่อให้ส่งค่า **hash id** แทน **id** เมื่อมีการเรียกใช้งานเมธอด `url_for`

```ruby
require 'secret'

class Book < ApplicationRecord
  def to_param
    Secret.encode(id)
  end
end
```

ถอดรหัส **hash id** ให้กลายเป็น **id** ก่อนที่จะเรียก query ผ่าน ORM

```ruby
def set_book
  @book = Book.find(Secret.decode(params[:id]))
end
```

> จะสังเกตุเห็นว่า ไม่ได้มีการแก้ไข resources ของ Book เลยแม้แต่น้อย

ทดสอบการทำงานดูซะหน่อย

![Book](/assets/images/posts/2020/เปลี่ยน-id-ให้เป็น-hash-id-บน-url/book.png)
*ใช้ hash id แทน id*

## References
- [hashids](https://hashids.org/)
- [to_param](https://devdocs.io/rails~6.0/activemodel/conversion#method-i-to_param)
