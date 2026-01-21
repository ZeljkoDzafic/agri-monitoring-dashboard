const toggleButton = document.getElementById('theme-toggle')

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('agri-theme', theme)
}

const savedTheme = localStorage.getItem('agri-theme')
if (savedTheme) {
  setTheme(savedTheme)
}

toggleButton?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme')
  setTheme(current === 'dark' ? 'light' : 'dark')
})
