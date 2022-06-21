---
layout: post
title: Add watermark to image before submit form
description: 'This blog will show you how to add text watermark to image and replace
  the input''s filelist with new one.
  '
author: Karn
tags:
- rails
- stimuls
categories: dev
twitter:
  card: summary_large_image
image:
  path: https://surfup.karn.work/covers/835ddb9c80/c028beea7c.png
  width: 1200
  height: 630
date: 2022-04-05 15:54 +0700
---
This blog will show you how to add text watermark to image and replace the input's filelist with new one.

Our code is written in **Stimulus Controller** without using any external library

```javascript
import { Controller } from "@hotwired/stimulus"

class Watermarker {
  constructor (width = 1400, height = 800) {
    this.width = width
    this.height = height
  }

  getImage (file) {
    return new Promise((resolve, _) => {
      const img = document.createElement('img')
      img.addEventListener("load", () => {
        URL.revokeObjectURL(file)
        resolve(img)
      })
      img.src = URL.createObjectURL(file)
    })
  }

  render (file, text, color = "black") {
    return new Promise(async (resolve, _) => {
      const canvas = document.createElement('canvas')
    
      const image = await this.getImage(file)
      // Can get image size (width, height) from image object

      canvas.width = this.width
      canvas.height = this.height
  
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, this.width, this.height)
      ctx.fillStyle = color
      ctx.textBaseline = "middle"
      ctx.font = "bold 60px serif"
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(-Math.PI / 4)
      ctx.textAlign = "center"
      ctx.fillText(text, 0, 0)
      ctx.restore()

      canvas.toBlob((blob) => {
        resolve(blob)
      })
    })
  }
}

export default class extends Controller {

  static targets = [ "previewer" ]

  connect () {
    this.text = this.data.get("text") || "Apply for identification"
    this.color = this.data.get("color") || "red"
    this.override = this.data.has("override") ? this.data.get("override") === "true" : false
  }
  
  async transform (event) {
    const file = event.target.files[0]
    const newBlob = await (new Watermarker()).render(file, this.text, this.color)

    if (this.override) {
      const newFile = new File([newBlob], file.name, { type: file.type })
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(newFile)
      event.target.files = dataTransfer.files
    }
    
    this.previewerTarget.src = URL.createObjectURL(newBlob)
  }
}
```

## Orginial Image File

![](/assets/images/posts/2022/add-watermark-to-image-before-submit-form/card.png){:width="300px"}
*Original Image*

## Watermarked Image File

![](/assets/images/posts/2022/add-watermark-to-image-before-submit-form/card_with_watermark.png){:width="400px"}
*Watermarked Image*