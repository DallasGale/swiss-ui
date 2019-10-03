import { colorPicker } from './helpers'
import UserTheme from '~/swiss.config.js'

export const colors = {
	dark: '#000000',
	light: '#ffffff'
}

export const siteTheme = {
	accent: UserTheme.theme.accentColor,
	mode: UserTheme.theme.mode,
}

export const themeTypes = {
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


// todo Add to a functions file.
function handleTheme() {
	if (siteTheme.mode === themeTypes.accent.name) {
		return siteTheme.accent
	}
	// ...
	if (siteTheme.mode === themeTypes.negative.name) {
		console.log('negative', themeTypes.negative)
		return colors.light
	}
	// ...
	if (siteTheme.mode === themeTypes.positive.name) {
		console.log('positive', themeTypes.positive)
		return colors.dark
	}
}

// todo body.style.background = colorPicker(themeChooser(siteTheme.mode))
body.style.background = handleTheme()
body.style.color = colorPicker(body.style.background)
