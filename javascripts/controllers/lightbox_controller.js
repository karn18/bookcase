import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ 'togglable', 'panel' ]

  connect () {
    const lightbox = GLightbox({ selector: "img" });
  }
}
