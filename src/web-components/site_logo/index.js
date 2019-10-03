import Colors from '../../js/constants'

const template = document.createElement('template')

template.innerHTML = `
	<style>
		.logo {
			width: auto;
			display: inline-block;
			padding: 0.8rem 0;
			font-weight: bold;
			font-size: 1.2rem;
		}
		.dev {
			color: ${Colors.red};
		}
	</style>
	<div id="logo" class="logo">
		<span class="name">DallasGale</span>
		<span class="dev">.dev</span>
	</div>
`

class SiteLogo extends HTMLElement {
	constructor() {
		super()

		const shadowRoot = this.attachShadow({
			mode: 'open'
		})

		shadowRoot.appendChild(template.content.cloneNode(true))
	}

}

customElements.define('site-logo', SiteLogo)