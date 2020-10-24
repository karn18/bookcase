---
layout: post
title: ส่งข้อมูลระหว่างแอพพลิเคชั่นผ่าน RabbitMQ
author: Karn
tags:
  - rails
  - ruby
  - rabbitmq
categories: dev
cover: "/assets/images/posts/2020/communication-between-apps-with-rabbitmq/cover.jpg"
image:
  path: "/assets/images/posts/2020/communication-between-apps-with-rabbitmq/cover.jpg"
date: 2020-06-14 19:35 +0700
---
❓ โจทย์วันนี้จะเป็นการศึกษาหาวิธีส่งข้อมูลระหว่าง **Ruby Application** โดยลองนึกภาพว่า**แอพตัวที่ 1**ถูกสร้างมาเพื่อบันทึกข้อมูลต่างๆ เก็บไว้ และต้องการส่งข้อมูลที่บันทึกไว้ไปยัง**แอพตัวที่ 2** เพื่อจุดประสงค์ต่างๆ เช่น การประมวลผล (Process) หรือบันทึกเหตุการณ์ (Log)<!--more-->

💡 สำหรับวิธีแก้ไขโจทย์นี้เราจะใช้ **RabbitMQ** เป็นตัวกลางในการสื่อสารระหว่างแอพพลิเคชัน ซึ่งมีภาพการเชื่อมต่อดังแสดงในภาพด้านล่าง

![architecture design](/assets/images/posts/2020/communication-between-apps-with-rabbitmq/architecture.png)
*แผนภาพการเชื่อมต่อระหว่าง Application กับ RabbitMQ*

🌱 รูปแบบการพัฒนาเป็นดังนี้
1. แอพตัวที่ 1 (**Rails Application**)
  - โมเดล **Post**  สำหรับเก็บข้อมูล โดยมีการดักจับเหตุการณ์ `after_create` เป็น trigger ในการส่งข้อมูล
  - สร้างคลาส `Publisher` เพื่อทำหน้าที่ในการส่งข้อมูลไปยัง **RabbitMQ** โดยใช้ไลบราลี่ **bunny** และกำหนด **channel** เป็น `kz.message`
  - เรียกใช้ Active Job ในการส่งข้อมูลผ่าน **background process** เพื่อให้โปรแกรมทำงานได้ราบรื่นยิ่งขึ้น

2. แอพตัวที่ 2 (**Ruby Application**)
  - สร้างเป็น Commandline Application ที่รับคำสั่ง `exit` เพื่อปิดโปรแกรมเพียงอย่างเดียว
  - สร้างคลาส `Subscriber` เพื่อรอรับข้อมูลจาก **RabbitMQ** โดยใช้ไลบราลี **bunny** เช่นเดียวกับ**แอพตัวที่ 1** และกำหนด **channel** เป็น `kz.message`
  - เมื่อรับข้อมูลเข้าจาก **RabbitMQ** ก็จะทำการบันเหตุการณ์ลงในไฟล์ชื่อ `my-post.log`

![Rails Application](/assets/images/posts/2020/communication-between-apps-with-rabbitmq/rails-application.png){:width="420px"}
*บันทึกโพสผ่าน Rails Application และส่งข้อมูลไปยัง RabbitMQ*

![Log](/assets/images/posts/2020/communication-between-apps-with-rabbitmq/my-post.log.png)
*Ruby Application รับข้อมูลจาก RabbitMQ และบันทึกเหตุการณ์ลงไฟล์*

## โค้ดตัวอย่างของ Publisher

```ruby
require 'bunny'

class Publisher
  class << self
    def publish(chnnl, message = {})
      puts "Publish message to #{chnnl} with #{message.to_json}"
      stream = channel.queue("kw.#{chnnl}")
      stream.publish(message.to_json)
    end

    def channel
      @channel ||= connection.create_channel
    end

    def connection
      @connection ||= Bunny.new.tap(&:start)
    end
  end
end
```

## โค้ดตัวอย่างของ Subscriber

```ruby
require 'bunny'
require 'json'
require 'logger'

@logger = Logger.new('my-post.log')

class Subscriber
  class << self
    def subscribe(queue, &block)
      q = channel.queue(queue)
      q.subscribe(manual_ack: false) do |delivery_info, properties, payload|
        puts "Received #{payload}, message properties are #{properties.inspect}"
        data = JSON.parse(payload)
        block.call(data) if block
      end
    end

    def channel
      @channel ||= connection.create_channel
    end

    def connection
      @connection ||= Bunny.new.tap(&:start)
    end
  end
end

# Start subscribe with channel name
Subscriber.subscribe("kz.message") do |data|
  @logger.info("ขณะนี้มีการสร้างโพสชื่อ #{data['title']} โดย #{data['author']} เมื่อเวลา #{data['created_at']}")
end

puts("Type exit to quit")
loop do
  cmd = gets.chomp
  exit(0) if (cmd == 'exit')
end
```

## Referecnes
- [RabbitMQ](https://www.rabbitmq.com)
- [Bunny](https://github.com/ruby-amqp/bunny)
