const animalDescriptionNavigation = () => {

    const sections = document.querySelectorAll('.animais-descricao section')
    const animalsList = document.querySelectorAll('.animais-lista li')

    sections[0].classList.add('active')

    animalsList.forEach((item, index) => {
        item.addEventListener('click', () => {
            sections.forEach(item => item.classList.remove('active'))
            sections[index].classList.add('active')
        })
    })
}

animalDescriptionNavigation()

const accordionActivate = () => {
    const faqList = document.querySelectorAll('.faq-lista dt');

    faqList.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active')
            item.nextElementSibling.classList.toggle('active')
        })
    })
}

accordionActivate()

const scrollSectionSmooth = () => {

    const allLinks = [
        ...document.querySelectorAll('.menu a[href^="#"]'),
        ...document.querySelectorAll('.bottom-menu a[href^="#"]')
    ]
    allLinks.forEach(item => {
        item.addEventListener('click', event => {
            event.preventDefault()
            document.querySelector(
                event
                    .currentTarget
                    .getAttribute('href')
            ).scrollIntoView({ behavior: 'smooth', block: 'start' })

        })
    })
}

scrollSectionSmooth()

const animateScroll = () => {
    const sections = document.querySelectorAll('.js-scroll')
    sections[0].classList.add('active')

    window.addEventListener('scroll', () => {
        sections
            .forEach(item => {
                const isInMiddleScreen = item.getBoundingClientRect().top - (window.innerHeight * 0.6) < 0
                isInMiddleScreen
                    ? item.classList.add('active')
                    : item.classList.remove('active')
            })
    })
}

animateScroll()