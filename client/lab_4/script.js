let slidePosition = 0;
const slides = document.getElementsByClassName('carousel-item');
const totalSlides = slides.length;

console.log(totalSlides);

document.
    getElementById('carousel_button_next')
    .addEventListener("click", function() {
        moveToNextSlide();
    });

    document.
    getElementById('carousel_button_prev')
    .addEventListener("click", function() {
        moveToPrevSlide();
    });

function updateSlidePosition() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
    }

    slides[slidePosition].classList.add('carousel-item-visible')
}

function moveToNextSlide() {
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }

    updateSlidePosition();
}

function moveToPrevSlide() {
   
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    updateSlidePosition();
}

