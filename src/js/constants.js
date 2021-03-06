import { colorPicker } from './helpers'
import UserTheme from '~/swiss.config.js'
import ChangeObserver from '../_utils/change_observer'

export const colors = {
	dark: '#000000',
	light: '#ffffff'
}

export const siteTheme = {
	accent: UserTheme.theme.accentColor,
	mode: UserTheme.theme.mode,
}

export const modeTypes = {
	accent: {
		name: 'accent',
	},
	positive: {
		name: 'positive',
	},
	negative: {
		name: 'negative',
	}
}


// ? Set global style to DOM
const body = document.querySelector('body')


// // todo Add to a functions file.
// function handleTheme() {
// 	if (siteTheme.mode === modeTypes.accent.name) {
// 		return siteTheme.accent
// 	}
// 	// ...
// 	if (siteTheme.mode === modeTypes.negative.name) {
// 		// console.log('negative', modeTypes.negative)
// 		return colors.light
// 	}
// 	// ...
// 	if (siteTheme.mode === modeTypes.positive.name) {
// 		// console.log('positive', modeTypes.positive)
// 		return colors.dark
// 	}
// }

function setBackgroundColor() {
	if (body.getAttribute('mode') === 'accent') {
		return siteTheme.accent
	}
	if (body.getAttribute('mode') === 'positive') {
		return colors.dark
	}
	if (body.getAttribute('mode') === 'negative') {
		return colors.light
	}
}




// ? Obseve <body /> for mode attr changes and then re-render the
// ?  page with Mutation Observer.

function handleBodyObserver() {
	body.style.background = setBackgroundColor()
	body.style.color = colorPicker(body.style.background)
}

ChangeObserver(body, () => handleBodyObserver())