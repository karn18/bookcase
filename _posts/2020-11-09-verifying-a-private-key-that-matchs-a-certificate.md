---
layout: post
title: รู้ได้ยังไงว่า Private Key เข้าคู่หรือไม่เข้าคู่กับ Certificate
author: Karn
tags:
- nginx
- ssl
category: dev
date: 2020-11-09 11:26 +0700
---
เมื่ออยากกำหนดให้เว็บไซด์ที่เรารันบน **Nginx** สามารถใช้งาน **HTTPS** วิธีที่ง่ายที่เราคุ้นชินก็คงใช้ **Certbot** ในการสร้างไฟล์ SSL certificate และ config ค่าต่างๆ ให้เรียบร้อยไปเลย
 ซึ่งก็จะประกอบด้วยไฟล์ private key และ certificate แต่เกิดเราต้องสร้างไฟล์ private key และ certicate ขึ้นมาเองหละ เราจะมั่นใจได้ยังไงว่า เราสร้างไฟล์ขึ้นมาได้ถูกต้องพร้อมนำไปใช้งาน<!--more-->

- ปัญหาที่ผมเจอคือ ผมได้รับไฟล์ private.key มาพร้อมกับ domain.crt และ intermediate.crt มาเพื่อมาจัดการ **HTTPS** ของเว็บไซด์อันหนึ่ง
- อันดับแรกก็คือการสร้างไฟล์ ​SSL certificate สำหรับโดเมนนี้ขึ้นมา โดยการรวมไฟล์ domain.crt และ intermediate.crt เข้าด้วยกัน จากนั้นก็นำไปติดตั้งใน **Nginx** 👉 [Here](https://www.ssldragon.com/blog/how-to-install-an-ssl-certificate-on-nginx/)
- ก่อนที่จะ reload config ก็ต้องตรวจสอบกันเล็กน้อยว่า config ถูกต้องหรือไม่

![key_mismatch](/assets/images/posts/2020/verifying-a-private-key-that-matchs-a-certificate/nginx-validate.png)

- ชัดเจนเลยว่ามันมีปัญหา และคงรันไม่ผ่านแน่ๆ ทั้งนี้เราก็สามารถตรวจสอบเองได้ง่ายๆ ด้วยคำสั่งนี้

```bash
$ sudo openssl rsa -noout -modulus -in private.key |md5sum
$ sudo openssl x509 -noout -modulus -in certificate.crt |md5sum
```

- โดยผลลัพท์ของ MD5 ที่ออกมาจากทั้งสองคำสั่งจะได้ค่าเดียวกัน นั้นแสดงว่าไฟล์ทั้งเข้าคู่กัน และสามารถนำไปใช้งานได้ แต่ถ้าเกิดผลลัพธ์ออกมาไม่เท่ากัน นั้นแสดงว่าเราอาจจะสร้างไฟล์ certificate ผิด

> การตรวจสอบค่าอาจจะใช้ algorithm อื่นแทน MD5 ก็ได้ ไม่ว่าจะเป็น SHA1 หรือ SHA256

# References
- [Cert Key Matcher](https://comodosslstore.com/ssltools/cert-key-matcher.php)
- [Check if certificate private key and csr match](https://www.looklinux.com/check-if-certificate-private-key-and-csr-match/)
