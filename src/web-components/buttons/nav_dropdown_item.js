import { colors } from '../../js/constants'

class NavDropdownItem extends HTMLElement {

	constructor() {
		super()

		// ? Styles
		const bs = this.style
		bs.display = 'block'
		bs.position = 'relative'
		bs.fontSize = '0.8rem'
		bs.boxSizing = 'border-box'
		bs.cursor = 'pointer'
		bs.padding = '0.5rem'

		console.log(this.title)
		this.textContent = this.title

		this.addEventListener('click', () => {
			console.log(this)
		})

		this.addEventListener('mouseover', () => {
			bs.background = colors.light
			bs.color = colors.dark
		})
		this.addEventListener('mouseout', () => {
			bs.background = 'none'
			bs.color = colors.light
		})
	}
}

customElements.define('nav-dropdown-item', NavDropdownItem)