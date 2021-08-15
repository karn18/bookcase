---
layout: post
title: ต่อยอดการใช้ Stimulus จัดการ input เพื่ออัพโหลดหลายๆ ไฟล์พร้อมกัน
author: Karn
tags:
- ruby
- rails
- stimulus
cover: "/assets/images/posts/2021/mulitple-files-upload-with-stimulus/cover.png"
image:
  path: "/assets/images/posts/2021/mulitple-files-upload-with-stimulus/cover.png"
  width: 1200
  height: 630
categories: dev
date: 2021-08-15 19:11 +0700
---
ต้องขอบคุณบทความ [Upload Multiple-files With Rails/](https://mentalized.net/journal/2020/11/30/upload-multiple-files-with-rails/) ของคุณ Jakob Skjerning ที่ทำให้เราสามารถเห็นรายชื่อไฟล์ที่เราเลือกที่จะใช้สำหรับอัพโหลดได้

สำหรับในบทความนี้ก็จะมาทำการต่อยอดสักเล็กน้อย เนื่องจาก
1. การที่กำหนด mulitple เป็น true เมื่อเลือกหลายๆ ไฟล์ปรากฏว่าไฟล์ที่เลือกมาแสดงจริงๆ มีแค่ไฟล์แรกไฟล์เดียวเท่านั้น
2. กรณีที่เราเลือกไฟล์ไปแล้ว เราจะไม่สามารถจะทำการยกเลิกไฟล์ที่เลือกไปแล้วได้ 

ดังนั้นสิ่งที่เราจะเพิ่มง่ายก็คือ
1. แทนที่จะเลือกไฟล์แรกเพียงไฟล์เดียว ก็ให้แสดงทั้งหมดซะ
2. เพิ่มปุ่มสำหรับกดลบไฟล์ที่ได้ทำการเลือกไปแล้ว

```javascript
  addFile (event) {
    const originalInput = event.target
    const originalParent = originalInput.parentNode
    const newInput = originalInput.cloneNode()

    // [1]. จากโค้ดที่ทำการสร้าง label ชื่อไฟล์จาก originalInput.files[0] ก็เปลี่ยนมาใช้การวนลูปแทน
    Array.from(originalInput.files).forEach(file => {
      const selectedFile = document.createElement("div")
      selectedFile.className = "grid grid-cols-3 gap-4 py-4"
    
      const divElement = document.createElement("div")
      divElement.className = "col-span-2"
      const labelNode = document.createElement("label")
      labelNode.appendChild(document.createTextNode(file.name))
      divElement.appendChild(labelNode)
      selectedFile.appendChild(divElement)

      // [2]. เพิ่มปุ่มโดยใช้ <a> และเขียนโค้ดในการลบไฟล์ดังกล่าวทิ้ง
      const deleteElement = document.createElement("a")
      deleteElement.setAttribute("class", "font-bold text-red-800 cursor-pointer")
      deleteElement.setAttribute("data-action", "multi-upload#removeFile")
      deleteElement.appendChild(this.deleteIcon)
      selectedFile.appendChild(deleteElement)

      originalInput.className = "hidden"
      selectedFile.append(originalInput)

      this.filesTarget.append(selectedFile)
    })

    // Clear value
    newInput.value = ""
    originalParent.append(newInput)
  }
```
ผลลัพท์ที่ได้ก็จะประมาณนี้

{% raw %}
<div class="video">
  <video controls playsinline>
    <source src="/assets/videos/multi_files_uploader.mov" type="video/mp4">
  </video>
</div>
{% endraw %}
