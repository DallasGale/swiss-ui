import { colors } from '../../js/constants'

const template = document.createElement('template')

template.innerHTML = `
	<style>
		.dropdown {
			position: relative;
			height: auto;
			display: inline-block;
		}

		.content{
			color: ${colors.light};
			display: none;
			position: absolute;
			background: ${colors.dark};
			z-index: 1;
			width: 100%;
		}

		.dropdown:hover .content { display: block; }
		.button:focus + .content {
			display: block;
		}

		.dropdown:hover .button {
			background: ${colors.light} !important;
			color: ${colors.dark} !important;
		}
	</style>
	<div class="dropdown">
		<button is="nav-button" id="nav-button" class="button" dropdown="true"></button>
		<div class="content">
			<slot name="items"></slot>
		</div>
	</div>
`

class NavDropdown extends HTMLElement {
	constructor() {
		super()

		this.setAttribute('open', false)
		const label = template.content.getElementById('nav-button')
		label.textContent = this.title

		const shadowRoot = this.attachShadow({
			mode: 'open'
		})
		shadowRoot.appendChild(template.content.cloneNode(true))

	}
}

customElements.define('nav-dropdown', NavDropdown)