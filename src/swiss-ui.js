// ? Import user settings config and assign them.
import UserConfig from '../swiss.config'
import './js/header'


// ? Header

// ? Buttons
import './web-components/buttons'

// ? Dropdown
import './web-components/nav-dropdown'

// ?Navigation

// Grid

// Side menu

// Typography ... H1 -> H6

// Images

// Lists

// Modals

// Form fields

// Branding


const { theme } = UserConfig
const { mode, typography } = theme

const body = document.querySelector('body')

body.style.fontFamily = setFontFamily(typography.fontFamily)
body.setAttribute('mode', mode)

// if (body.getAttribute('mode') === 'positive') {
// 	body.style.background
// }


const main = document.querySelector('main')
const title = document.title
const heading = `<h1>${title}</h1>`

main.insertAdjacentHTML('beforebegin', `${heading}`)



// ? Functions

function setFontFamily(font) {
	if (font === 'default') {
		return 'helvetica, sans-serif'
	}
	else if (font) {
		return font
	} else {
		return 'helvetica, sans-serif'
	}
}
