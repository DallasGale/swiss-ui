class Dialog extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({
      mode: 'open'
    })
    this.close = this.close.bind(this)
  }

  set open(isOpen) {

  }

}