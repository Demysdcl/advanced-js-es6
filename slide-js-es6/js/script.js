import SlideNav from './slide-nav.js';

const slide = new SlideNav('.slide-wrapper', '.slide')
slide.init()


slide.addArrow('.prev', '.next')

slide.addControl('.custom-controls')

console.log(slide);
