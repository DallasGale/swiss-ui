import { siteTheme, themeTypes, colors } from '../../js/constants'
import { colorPicker } from '../../js/helpers'

const { accent } = siteTheme


class SwissButton extends HTMLButtonElement {

	constructor() {
		super()

		// ? CSS
		const bs = this.style
		const buttonType = this.getAttribute('type')
		// todo Add to a functions file.
		function buttonTheme() {
			if (buttonType === themeTypes.accent.name) {
				console.log('accent', themeTypes.accent)
				return accent
			}
			// ...
			if (buttonType === themeTypes.negative.name) {
				console.log('negative', themeTypes.negative)
				return colors.light
			}
			// ...
			if (buttonType === themeTypes.positive.name) {
				console.log('positive', themeTypes.positive)
				return colors.dark
			}
		}

		// * Theme
		bs.background = buttonTheme()
		bs.color = colorPicker(bs.background)


		// * Default
		bs.border = 0
		bs.boxSizing = 'border-box'
		bs.cursor = 'pointer'
		bs.display = 'inline-block'
		bs.fontSize = '0.8rem'
		bs.fontWeight = 'bold'
		bs.minWidth = '10vw'
		bs.overflow = 'hidden'
		bs.padding = '1.2rem 3rem'
		bs.position = 'relative'
		bs.textTransform = 'uppercase'

		// Dropdown content
		this._hasDropdown = this.getAttribute('dropdown')
		const icon = document.createElement('span')
		const is = icon.style
		is.alignItems = 'center'
		is.display = 'flex'
		is.fontSize = '1.2rem'
		is.height = '100%'
		is.justifyContent = 'center'
		is.position = 'absolute'
		is.right = '0.5rem'
		is.transform = 'rotate(180deg)'
		is.top = 0
		is.width = '2rem'
		icon.innerHTML = '&#9954'

		if (this._hasDropdown) {
			this.insertAdjacentElement('beforeend', icon)
		}

		this.setAttribute('active', false)



		// ? Event handlers
		const defaultButtonBackground = bs.background
		const defaultButtonColor = bs.color
		const activeButtonBackground = bs.color
		const activeButtonColor = bs.background

		this.addEventListener('focus', () => {
			bs.background = activeButtonBackground
			bs.color = activeButtonColor

			if (this._hasDropdown) {
				const iconEl = this.querySelector('span')
				iconEl.style.transform = 'rotate(0deg)'
				iconEl.style.transition = 'all 0.3s'
			}
		})

		this.addEventListener('focusout', () => {
			bs.background = defaultButtonBackground
			bs.color = defaultButtonColor

			if (this._hasDropdown) {
				const iconEl = this.querySelector('span')
				iconEl.style.transform = 'rotate(180deg)'
				iconEl.style.transition = 'all 0.3s'
			}
		})

		this.addEventListener('mouseover', () => {
			bs.background = activeButtonBackground
			bs.color = activeButtonColor

			this.setAttribute('open', true)
			this.setAttribute('active', true)

			// Remove this 'cursor' as a dropdown
			// shouldn't need a clickable parent button
			if (this._hasDropdown) bs.cursor = 'default'


			if (this._hasDropdown) {
				const iconEl = this.querySelector('span')
				iconEl.style.transform = 'rotate(0deg)'
				iconEl.style.transition = 'all 0.3s'
			}
		})

		this.addEventListener('mouseout', () => {
			bs.background = defaultButtonBackground
			bs.color = defaultButtonColor

			this.setAttribute('open', false)
			this.setAttribute('active', false)

			if (this._hasDropdown) {
				const iconEl = this.querySelector('span')
				iconEl.style.transform = 'rotate(180deg)'
				iconEl.style.transition = 'all 0.3s'
			}
		})
	}
}

customElements.define('swiss-button', SwissButton, {
	extends: 'button'
})