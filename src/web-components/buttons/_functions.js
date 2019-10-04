import { colors, modeTypes } from '../../js/constants'
import { colorPicker } from '../../js/helpers'

export const setButtonBackground = (mode, accent) => {
	if (mode === modeTypes.accent.name) {
		return accent
	}

	if (mode === modeTypes.negative.name) {
		return colors.light
	}

	if (mode === modeTypes.positive.name) {
		return colors.dark
	}
}

export const setButtonBorderColor = (siteMode, buttonMode, accent) => {

	// 1. If accent bg and accent button
	if (siteMode === 'accent' && buttonMode === 'accent') {
		const color = colorPicker(accent)
		return color
	}


	// 2. if accent bg and negative button
	if (siteMode === 'accent' && buttonMode === 'negative') {
		// console.log(buttonMode)
		return colors.light
	}


	// 3. if accent bg and positive button
	if (siteMode === 'accent' && buttonMode === 'positive') {
		// console.log(buttonMode)
		return colors.dark
	}


	// 4. If positive bg and positive button
	if (siteMode === 'positive' && buttonMode === 'positive') {
		const color = colorPicker(accent)
		return color
	}


	// if (siteMode === 'negative' && buttonMode === 'negative') {
	// 	// console.log('siteMode', siteMode)
	// 	return colors.negative
	// }

	// if (siteMode === 'positive' && buttonMode === 'positive') {
	// 	return colors.positive
	// }

	// else {
	// 	return buttonMode
	// }
}

