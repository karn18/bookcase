---
layout: post
title: Meilisearch vs Elasticsearch
description: |
  ถ้าจะกล่าวถึง Full-Text Search ก็น่าจะพอได้ยิน Elasticsearc กันมาบ้าง
  และจากบทความ[How to add Search in Rails using Meilisearch](https://gorails.com/episodes/how-to-use-meilisearch-rails?autoplay=1)
  ทำให้เราได้เจอกับ [Meilisearch](https://www.meilisearch.com/) ซึ่งเป็นเครื่องมือที่ดีตัวหนึ่งในการทำ
  Full-Text Search เพียงแต่อาจจะต้องรอให้เติมโตจนพร้อมกว่านี้ คาดว่าอาจจะทำงานได้เทียบเคียงกับ
  Elasticsearch เลยทีเดียว
author: Karn
tags:
- elasticsearch
- meilisearch
categories: dev
twitter:
  card: summary_large_image
image:
  path: "/assets/images/posts/2022/meilisearch-vs-elasticsearch/cover.png"
  width: 1200
  height: 630
date: 2022-03-20 12:30 +0700
---
ถ้าจะกล่าวถึง Full-Text Search ก็น่าจะพอได้ยิน **Elasticsearch** กันมาบ้าง และจากบทความ[How to add Search in Rails using Meilisearch](https://gorails.com/episodes/how-to-use-meilisearch-rails?autoplay=1) ทำให้เราได้เจอกับ [Meilisearch](https://www.meilisearch.com/) ซึ่งเป็นเครื่องมือที่ดีตัวหนึ่งในการทำ Full-Text Search เพียงแต่อาจจะต้องรอให้เติมโตจนพร้อมกว่านี้ คาดว่าอาจจะทำงานได้เทียบเคียงกับ **Elasticsearch** เลยทีเดียว

ในบทความนี้เราจะมาลองพัฒนาโปรแกรมขึ้นมา 2 ตัวสำหรับบันทึกข้อความด้วย **Action Text** และบันทึกข้อมูลลงในฐานข้อมูลผ่าน **Action Storage** โดยแต่ละตัวจะใช้ engine สำหรับ Full-Text Search ที่ต่างกัน เพื่อทดลองเปรียบเทียบตั้งแต่การติดตั้งใช้งานแต่ละตัว การเขียนโค้ด และผลลัพท์ที่ได้ในการใช้งาน

## การติดตั้ง

ในแง่ของการติดตั้งต้องบอกเลยว่า **Meilisearch** นั้นทำได้ง่ายกว่า **Elasticsearch** มากๆ แบบไม้ยมกต่อท้ายสัก 100 ตัว เพราะใช้คำสั่งแค่ 2 คำสั่งก็รัน service ขึ้นมาให้พร้อมใช้งานได้เลย ถ้าเทียบกับ **Elasticsearch** นี้ต้องใช้เวลานานอยู่พอสมควร แต่ทั้งนี้ก็ต้องยอมรับว่าตอนนี้ **Meilisearch** ยังมีฟังก์ชันฟีเจอร์ที่ต่างกับ **Elasticsearch** อยู่มากเลยทำให้ยังไม่มี dependency ใดๆ ที่ต้องมาผูกเข้าด้วยกัน

## การเขียนโค้ด

แน่นอนว่าการใช้งาน Full-Text Search จะต้องมีการเขียนโค้ดและกำหนดค่าต่างๆ ไม่ว่าจะเป็นการเชื่อมต่อไปยัง Server หรือระบุค่า Attributes หรือ Fields ที่ใช้สำหรับส่งไปเก็บบันทึก โดยโค้ดตัวอย่างที่แสดงด้านล่างจะเป็นการกำหนดค่าที่ได้จาก `content` ไปเก็บไว้ ซึ่งเราได้พยายามกำหนดค่าที่ง่ายและจำเป็นที่สุดในการใช้งานเท่านั้น

```ruby
# app/models/message.rb
# Meilisearch
class Message < ApplicationRecord
  include MeiliSearch::Rails

  has_rich_text :content
  meilisearch do
    attribute :content
    attributes_to_highlight ['*']
  end  
end
```

```ruby
# app/models/message.rb
# Elasticsearch
require "elasticsearch/model"

class Message < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  has_rich_text :content
  settings index: { number_of_shards: 1 } do
    mappings dynamic: true do
      indexes :content, type: :object do
        indexes :id, type: :long
        indexes :name, type: :text
        indexes :body, type: :text, analyzer: 'thai'
        indexes :record_id, type: :long
        indexes :record_type, type: :text
      end
    end
  end

  def as_indexed_json(options={})
    as_json(elastic: true)
  end

  def as_json(options={})
    if options.fetch(:elastic, false)
      super(include: :content).tap do |message|
        message["content"]["body"] = content.to_plain_text
      end
    else
      super
    end
  end
end
```

## ทดสอบการใช้งาน

![](/assets/images/posts/2022/meilisearch-vs-elasticsearch/messages.png){:width="600px"}
*[Elasticsearch & Meilisearch] Message ที่สร้างขึ้นมาทดสอบ*

- ค้นหาคำว่า **api**

![](/assets/images/posts/2022/meilisearch-vs-elasticsearch/elasticsearch-1.png){:width="600px"}
*[Elasticsearch] ค้นหาคำว่า api*

![](/assets/images/posts/2022/meilisearch-vs-elasticsearch/meilisearch-1.png){:width="600px"}
*[Meilisearch] ค้นหาคำว่า api*

- ค้นหาคำว่า **ไทย**

![](/assets/images/posts/2022/meilisearch-vs-elasticsearch/elasticsearch-2.png){:width="600px"}
*[Elasticsearch] ค้นหาคำว่า ไทย*

![](/assets/images/posts/2022/meilisearch-vs-elasticsearch/meilisearch-2.png){:width="600px"}
*[Meilisearch] ค้นหาคำว่า api*

ในเวอร์ชันปัจจุบันของ **Meilisearch** [0.26] ยังไม่รองรับ tokenizer ที่เป็นภาษาไทยเลยทำให้ในตอนนี้ยังไม่สามารถตัดคำ และค้นหาคำที่เป็นภาษาไทยได้ แต่ถ้าเราใช้ภาษาอังกฤษก็ไม่ติดประเด็นอะไร

## References
- [Elasticsearch](https://www.elastic.co/elasticsearch/)
- [Meilisearch](https://www.meilisearch.com/)
