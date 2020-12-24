import debounce from './debounce.js'

export default class Slide {
  constructor(wrapper, slide) {
    this.wrapper = document.querySelector(wrapper)
    this.slide = document.querySelector(slide)
    this.distance = { finalPosition: 0, startX: 0, movement: 0 }
    this.changeEvent = new Event('changeEvent')
  }

  onStart(event) {
    let typeMove = 'touchmove'
    if (event.type === 'mousedown') {
      event.preventDefault()
      typeMove = 'mousemove'
    }

    this.distance.startX = event.clientX || event.changedTouches[0].clientX
    this.wrapper.addEventListener(typeMove, this.onMove)
    this.transition(false)
  }

  onResize() {
    setTimeout(() => {
      this.slideConfig()
      this.changeSlide(this.index.active)
    }, 1000)
  }

  addResizeEvent() {
    window.addEventListener('resize', this.onResize)
  }

  transition(active) {
    this.slide.style.transition = active ? 'transform .3s' : ''
  }

  moveSlide(clientX) {
    this.distance.movePosition = clientX
    this.slide.style.transform = `translate3d(${clientX}px, 0, 0)`
  }

  onMove(event) {
    this.moveSlide(this.updatePosition(event.clientX || event.changedTouches[0].clientX))
  }

  updatePosition(clientX) {
    this.distance.movement = (this.distance.startX - clientX) * 1.6
    return this.distance.finalPosition - this.distance.movement
  }

  onEnd(event) {
    const typeMove = event.type === 'mouseup' ? 'mousemove' : 'touchmove'
    this.wrapper.removeEventListener(typeMove, this.onMove)
    this.distance.finalPosition = this.distance.movePosition
    this.changeSlideOnEnd()
    this.transition(true)
  }

  changeSlideOnEnd() {

    if (this.distance.movement > 120) {
      this.changeSlide(this.index.next)
    } else if (this.distance.movement < -120) {
      this.changeSlide(this.index.prev)
    } else {
      this.changeSlide(this.index.active)
    }
  }

  addSlideEvents() {
    this.wrapper.addEventListener('mousedown', this.onStart)
    this.wrapper.addEventListener('touchstart', this.onStart)

    this.wrapper.addEventListener('mouseup', this.onEnd)
    this.wrapper.addEventListener('touchend', this.onEnd)
  }

  slidePosition(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2
    return -(slide.offsetLeft - margin)
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map(element => {
      return {
        element,
        position: this.slidePosition(element)
      }
    })
  }

  changeSlide(index) {
    this.slideIndexNav(index)
    const activeSlide = this.slideArray[index];
    this.moveSlide(activeSlide.position)
    this.distance.finalPosition = activeSlide.position
    this.changeActiveClass()
    this.wrapper.dispatchEvent(this.changeEvent)
  }

  changeActiveClass() {
    this.slideArray.forEach(item =>
      item.element.classList.remove('active')
    )
    this.slideArray[this.index.active].element.classList.add('active')
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1

    this.index = {
      prev: index ? index - 1 : last,
      active: index,
      next: index === last ? 0 : index + 1
    }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this.onResize = debounce(this.onResize.bind(this), 200)
  }

  init() {
    this.bindEvents()
    this.addSlideEvents()
    this.slideConfig()
    this.addResizeEvent()
    this.changeSlide(0)
    this.transition(true)
    return this
  }

}
