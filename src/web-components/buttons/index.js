import './swiss-button'
import './nav_dropdown_item'

const section = document.getElementById('buttons')
const elementName = section.id

section.innerHTML = `
  <h2 class="typography__heading--one">${elementName}</h2>
  <div id='${elementName}-content'>
    <button
      is="swiss-button"
      type="accent"
    >
      Accented
    </button>

    <button
      is="swiss-button"
      type="positive"
    >
      Positive
    </button>
    
    <button
      is="swiss-button"
      type="negative"
    >
      Negative
    </button>
    
  </div>
  `

