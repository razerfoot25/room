const hamburger = document.querySelector('#hamburger');
const navHeader = document.querySelector('.nav__header-container');
const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');

const carouselCards = document.querySelector('.carousel__cardholder');
const cards = Array.from(carouselCards.children);

hamburger.addEventListener('change', e =>{
    if(e.target.checked) {
       navHeader.classList.add('nav-open');
 
    }else {
        navHeader.classList.remove('nav-open');
    }
})


const slideWidth = slides[0].getBoundingClientRect().width;
const setSlidePosition = (slide , i) => {
    slide.style.left = slideWidth * i + 'px';
}

slides.forEach(setSlidePosition);

const moveToSlide = (track , currentSlide , targetSlide) => {
    // move to next slide
   track.style.transform = 'translateX( -' + targetSlide.style.left + ')';

   // add current slide to target slide
   currentSlide.classList.remove('current-slide');
   targetSlide.classList.add('current-slide');
}

const MoveNav = (currentNav,targetNav) => {

    currentNav.classList.remove('current-slide');
    targetNav.classList.add('current-slide');
}

const UpdateArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevButton.disabled = true;
        nextButton.disabled = false;
    }else if (targetIndex === slides.length -1) {
        prevButton.disabled = false;
        nextButton.disabled = true;
    }else {
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
}

nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentNav = carouselCards.querySelector('.current-slide');
    const nextNav = currentNav.nextElementSibling;
    const targetIndex = slides.findIndex(slide => slide === nextSlide)

    moveToSlide(track , currentSlide , nextSlide);

    MoveNav(currentNav,nextNav);
    UpdateArrows(slides,prevButton,nextButton,targetIndex);
})

prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;

    const currentNav = carouselCards.querySelector('.current-slide');
    const prevNav = currentNav.previousElementSibling;
    const targetIndex = slides.findIndex(slide => slide === prevSlide)
    moveToSlide(track,currentSlide,prevSlide);

    MoveNav(currentNav,prevNav);
    UpdateArrows(slides,prevButton,nextButton,targetIndex);
})

