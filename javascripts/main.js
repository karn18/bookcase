import "@hotwired/turbo"
import { Application } from "@hotwired/stimulus"

import MenuController from "./controllers/menu_controller"

window.Stimulus = Application.start()
Stimulus.register("menu", MenuController)

document.addEventListener("DOMContentLoaded", function() {
  const h = document.documentElement;
  const b = document.body;
  const st = 'scrollTop';
  const sh = 'scrollHeight';
  const progress = document.querySelector('.progress');
  let scroll;

  document.addEventListener('scroll', function() {
    scroll = (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    progress.style.setProperty('--scroll', scroll + '%');
  })
})
