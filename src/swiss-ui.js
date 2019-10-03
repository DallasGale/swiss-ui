console.log('🇨🇭swiss-ui here')

// ? Import user settings config and assign them.
import UserConfig from '../swiss.config'

const { theme } = UserConfig
const { mode, typography } = theme
const { fontFamily } = typography

const body = document.querySelector('body')

// todo Move to a functions file.
function setFontFamily() {
	if (fontFamily.isHelvetica) return 'helvetica, sans-serif'
	else 'inherit'
}



body.style.fontFamily = setFontFamily()
body.setAttribute('mode', mode)

if (body.getAttribute('mode') === 'positive') {
	body.style.background
}


// console.log(body)


const main = document.querySelector('main')
const title = document.title
const heading = `<h1>${title}</h1>`

main.insertAdjacentHTML('beforebegin', `<h1>${heading}</h1>`)
// Web Components - elements
// import './web-components/site_logo/'

// Buttons
import './web-components/buttons'

// Dropdown
import './web-components/nav-dropdown'

// Header

// Navigation

// Grid

// Side menu

// Typography ... H1 -> H6

// Images

// Lists

// Modals

// Form fields

// Branding