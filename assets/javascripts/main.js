document.addEventListener("DOMContentLoaded", function(){
  console.log('loaded')
  let theme = localStorage.getItem('theme');
  let themeElement = document.querySelector('[data-theme]')
  console.log(themeElement.dataset.theme)
})
