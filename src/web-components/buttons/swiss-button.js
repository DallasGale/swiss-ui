import { siteTheme, themeTypes, colors } from '../../js/constants'
import { colorPicker } from '../../js/helpers'
import { setButtonBackground, setButtonBorderColor } from './_functions'

const { accent } = siteTheme

// * HTML Template
const template = document.createElement('template')
template.innerHTML = `
	<button>button label</button>
`


class SwissButton extends HTMLElement {

	constructor() {
		super()

		// * Assign template to a constant
		const button = template.content.querySelector('button')

		// * Set label text
		const label = this.textContent
		button.textContent = label

		// * Grab the 'theme' attr from the actual DOM wrapper element '<swiss-button'>
		const buttonMode = this.getAttribute('mode')

		// * Apply CSS
		const bs = button.style
		bs.background = setButtonBackground(buttonMode, accent)
		bs.color = colorPicker(bs.background)
		bs.borderWidth = '3px'
		bs.borderColor = setButtonBorderColor(siteTheme.mode, buttonMode, accent)
		bs.borderStyle = 'solid'
		bs.borderRadius = '0px'
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
		// this._hasDropdown = this.getAttribute('dropdown')
		// const icon = document.createElement('span')
		// const is = icon.style
		// is.alignItems = 'center'
		// is.display = 'flex'
		// is.fontSize = '1.2rem'
		// is.height = '100%'
		// is.justifyContent = 'center'
		// is.position = 'absolute'
		// is.right = '0.5rem'
		// is.transform = 'rotate(180deg)'
		// is.top = 0
		// is.width = '2rem'
		// icon.innerHTML = '&#9954'

		// if (this._hasDropdown) {
		// 	this.insertAdjacentElement('beforeend', icon)
		// }

		// button.setAttribute('active', false)

		// ? Event handlers
		const defaultButtonBackground = bs.background
		const defaultButtonColor = bs.color
		const activeButtonBackground = bs.color
		const activeButtonColor = bs.background

		this.addEventListener('focus', () => {
			const thisButton = this.shadowRoot.querySelector('button')
			thisButton.style.background = activeButtonBackground
			thisButton.style.color = activeButtonColor

			// if (this._hasDropdown) {
			// 	const iconEl = this.querySelector('span')
			// 	iconEl.style.transform = 'rotate(0deg)'
			// 	iconEl.style.transition = 'all 0.3s'
			// }
		})

		this.addEventListener('focusout', () => {
			const thisButton = this.shadowRoot.querySelector('button')
			// console.log('focus out', thisButton)
			thisButton.style.background = defaultButtonBackground
			thisButton.style.color = defaultButtonColor

			// if (this._hasDropdown) {
			// 	const iconEl = this.querySelector('span')
			// 	iconEl.style.transform = 'rotate(180deg)'
			// 	iconEl.style.transition = 'all 0.3s'
			// }
		})

		button.addEventListener('mouseover', () => {
			bs.background = activeButtonBackground
			bs.color = activeButtonColor

			button.setAttribute('open', true)
			button.setAttribute('active', true)

			// ! Remove this 'cursor' as a dropdown
			// ! shouldn't need a clickable parent button
			// if (this._hasDropdown) bs.cursor = 'default'


			// if (this._hasDropdown) {
			// 	const iconEl = this.querySelector('span')
			// 	iconEl.style.transform = 'rotate(0deg)'
			// 	iconEl.style.transition = 'all 0.3s'
			// }
		})

		button.addEventListener('mouseout', () => {
			bs.background = defaultButtonBackground
			bs.color = defaultButtonColor

			button.setAttribute('open', false)
			button.setAttribute('active', false)

			// if (this._hasDropdown) {
			// 	const iconEl = this.querySelector('span')
			// 	iconEl.style.transform = 'rotate(180deg)'
			// 	iconEl.style.transition = 'all 0.3s'
			// }
		})




		// ? Shadow DOM
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(template.content.cloneNode(true))


		const config = {
			attributes: true,
		}
		const body = document.querySelector('body')
		const callback = (mutationsList) => {
			for (let mutation of mutationsList) {
				if (mutation.type === 'attributes') {
					if (body.getAttribute('mode') === 'positive' && this.getAttribute('mode') === 'positive') {
						this.shadowRoot.querySelector('button').style.borderColor = colors.light
					}
				}
			}
		}

		const observer = new MutationObserver(callback)

		observer.observe(body, config)

	}
}

customElements.define('swiss-button', SwissButton)