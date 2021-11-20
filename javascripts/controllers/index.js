import { Application } from "@hotwired/stimulus"
window.Stimulus = Application.start()

import LightboxController from './lightbox_controller'
import MenuController from './menu_controller'

Stimulus.register("lightbox", LightboxController)
Stimulus.register("menu", MenuController)
