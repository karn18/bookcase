import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static headings = [ "h1", "h2", "h3" ]
  static values = { idEnabled: Boolean }
  static classes = [ "anchorLink" ]

  connect () {
    const headings = document.querySelectorAll(this.constructor.headings.join(","))
    const anchorLinkClass = this.hasAnchorLinkClass ? this.anchorLinkClass : "anchor-link"
    headings.forEach(heading => {
      const rawStr = this.removeTags(heading.innerHTML)
      const id = this.slugify(rawStr)
      if (this.idEnabledValue) { heading.id = id }
      heading.innerHTML = `<a href="#${id}" class="${anchorLinkClass}">${rawStr}<\/a>`
    })

    document.addEventListener("turbo:click", (event) => {
      if (event.detail.url.includes("#")) {
        return event.preventDefault()
      }
    })
  }

  slugify (text) {
    return text.replace(/^\s+|\s+$/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/\&amp;/g, '-')
        .toLowerCase()
  }

  removeTags (text) {
    if ((text === null) || (text === ''))
      return false

    text = text.toString()
    return text.replace(/(<([^>]+)>)/ig, '')
  }
}
