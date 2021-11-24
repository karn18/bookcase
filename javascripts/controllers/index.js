import { Application } from "@hotwired/stimulus"
window.Stimulus = Application.start()

import LightboxController from './lightbox_controller'
import MenuController from './menu_controller'
import ThemeController from './theme_controller'

Stimulus.register("lightbox", LightboxController)
Stimulus.register("menu", MenuController)
Stimulus.register("theme", ThemeController)