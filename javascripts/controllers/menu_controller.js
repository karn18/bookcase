import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'togglable', 'panel' ]

  connect () {
    this.isOpen = false
    document.querySelector("body").addEventListener("click", (event) => {
      if (this.isOpen) {
        this._toggle()
      }
    })
  }

  toggle (event) {
    event.stopPropagation()
    this._toggle()
  }

  _toggle () {
    this.isOpen = !this.isOpen
    this.togglableTarget.classList.toggle("md:hidden")
    this.panelTarget.classList.toggle("hidden")
  }
}
