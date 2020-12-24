export default class Slide {
  constructor(wrapper, slide) {
    // const select = document.querySelector
    this.wrapper = document.querySelector(wrapper)
    this.slide = document.querySelector(slide)
  }

  onStart(event) {
    event.preventDefault()
    this.wrapper.addEventListener('mousemove', this.onMove)
  }

  onMove(event) {
    console.log('Moving');
  }

  onEnd(event) {
    this.wrapper.removeEventListener('mousemove', this.onMove)
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)

    this.wrapper.addEventListener('mouseup', this.onEnd)
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  init() {
    this.bindEvents()
    this.addSlideEvents()
    return this
  }

}
