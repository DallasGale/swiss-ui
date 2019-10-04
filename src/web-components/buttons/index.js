import './swiss-button'
import './nav_dropdown_item'

const section = document.getElementById('buttons')
const elementName = section.id

section.innerHTML = `
  <h2 class="typography__heading--one">${elementName}</h2>
  <div id='${elementName}-content'>

    <swiss-button mode="accent">
      Accented
    </swiss-button>

    <swiss-button mode="positive">
      Positive
    </swiss-button>
    
    <swiss-button mode="negative">
      Negative
    </swiss-button>
  
  </div>
  `

