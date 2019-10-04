const header = document.getElementById('site-header')
const body = document.querySelector('body')
header.innerHTML = 'Toggle Site Mode'

const hs = header.style
hs.fontSize = '0.6rem'
hs.position = 'fixed'
hs.top = 0
hs.width = '100%'
hs.padding = '1rem'
hs.textAlign = 'right'
hs.right = 0

const radios = `
  <form>
    <label for="radio-accent">Accent
    <input name="siteMode" id="radio-accent" type="radio" value="Accent" />
    
    <label for="radio-negative">Negative
    <input name="siteMode" id="radio-negative" type="radio" value="Negative" />

    <label for="radio-positive">Positive
    <input name="siteMode" id="radio-positive" type="radio" value="Positive" />
  </form>
  `

header.insertAdjacentHTML('beforeend', radios)

document.onreadystatechange = () => {
	if (document.readyState === 'complete') {

		const radios = header.querySelectorAll('input')
		// console.log(radios)

		radios.forEach(radio => {
			// console.log(radio)

			radio.addEventListener('click', () => {
				// console.log(radio.value)
				body.setAttribute('mode', radio.value.toLowerCase())

			})
		})
	}

}