---
layout: post
title: ลาก่อน wkhtmltopdf และยินดีต้อนรับ Puppeteer
description: wkhtmltopdf เป็นหนึ่งในเครื่องมือที่ใช้ออกรายงาน PDF ซึ่งเราเองก็ได้ใช้มาเป็นเวลานาน
  แต่ด้วยปัญหาการใช้ต่างๆ รวมถึงการที่ตัวเครื่องมือเองไม่ค่อยได้รับการอัพเดต ทำให้ต้องมองหาเครื่องมือตัวอื่นมาทดแทนและก็ได้พบกับ
  Puppeteer ซึ่งเป็นฮีโร่มาช่วยเราไว้
author: Karn
tags:
- rails
- puppeteer
- wkhtmltopdf
- pdf
- LFP
categories: dev
image:
  path: "/assets/images/posts/2022/bye-bye-wkhtmltopdf-welcome-puppeteer/cover.png"
  width: 1200
  height: 630
date: 2022-03-05 18:15 +0700
---
บทความนี้จะเล่าถึงเส้นทางการเปลี่ยนเครื่องมือที่ใช้ในการออกรายงาน PDF ซึ่งก่อนหน้านี้เราได้ใช้ **wkhtmltopdf** อยู่หลายโปรเจ็คด้วยกัน ซึ่งปัญหาที่ทำให้ตัดสินใจต้องหาเครื่องมือมาทดแทนเกิดจากขยัก 2 ขยักด้วยกัน

1. การใช้งาน gem `wicked_pdf` ซึ่งเป็น wrapper ในการเรียกใช้งาน **wkthtmltopdf** กับ **Rails** ที่ไม่ได้ใช้ gem `sprockets` จะมีปัญหาในการใช้งาน helper tag (`javascript_include_tag`) สำหรับนำเข้า **CSS** เข้ามาใน **HTML** ทำให้ต้องเขียน helper tag ใหม่ขึ้นมาจัดการ

    ```ruby
    # /app/helpers/wicked_pdf_helper.rb
    module WickedPdfHelper
      def wicked_pdf_stylesheet_include_tag(*sources)
        stylesheet_contents = sources.collect do |source|
          "<style type='text/css'>#{read_stylesheet(source)}</style>"
        end.join("\n")

        stylesheet_contents.html_safe
      end

      def pdf_stylesheet_include_tag(*sources)
        sources.collect do |source|
          read_stylesheet(source)
        end.join("\n")
      end

      def read_stylesheet(source)
        if Rails.env == "development"
          origin = request.protocol + request.host_with_port
          uri = URI("#{origin}/assets/#{source}")
          Net::HTTP.get(uri)
        else 
          # Read assets from local file
          IO.read(File.join(Rails.root, 'public', asset_path(source)).to_s)
        end
      end
    end
    ```

2. เมื่อทำการแก้ไขปัญหานำเข้า **CSS** ไปแล้วก็ต้องมาเจอกับปัญหาอีกขยัก ซึ่งเป็นความไม่ยืดหยุ่นในการใช้งาน ไม่ว่าจะเป็น **CSS** ที่ไม่สามารถใช้ **Flex** ได้ การแสดงผลฟ้อนต์ที่ต้องติดตั้งในเครื่อง และไม่สามารถใช้ผ่าน **HTTP** ได้

    เมื่อได้ค้นหาและทดลองเปลี่ยนมาใช้ **Puppeteer** ผ่าน gem `groover` ก็ให้ประสบการณ์การใช้งานที่ไม่ได้แตกต่างกับการใช้ **wkhtmltopdf** แถมยังทำให้การพัฒนา **CSS** สำหรับ PDF ทำได้ง่ายขึ้น และแสดงผลได้ตรงมากขึ้น


    สำหรับวิธีการเรียกใช้ก็ปรับเปลี่ยนแค่เล็กน้อย ดังแสดงในโค้ดด้านล่าง

    ```ruby
    ## Groover & Peppeteer
    respond_to do |format|
      format.pdf do
        render pdf: "price_tag.pdf", template: "tag_buckets/price_tag", layout: "pdf"
      end
    end

    ## Wicked PDF & wkhtmltopdf
    respond_to do |format|
      format.pdf do
        html = render_to_string({
          template: 'tag_buckets/price_tag',
          layout: 'pdf'
        })
        send_data(Grover.new(html).to_pdf, disposition: 'inline', filename: "price_tag.pdf", type: 'application/pdf')
      end
    end
    ```


## References:
- [wkhtmltopdf](https://wkhtmltopdf.org/)
- [Wicked PDF](https://github.com/mileszs/wicked_pdf)
- [Groover](https://github.com/Studiosity/grover)
- [Peppeteer](https://github.com/puppeteer/puppeteer)