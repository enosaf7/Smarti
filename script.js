let slideIndex = 0;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    
    // Loop back to the beginning/end if necessary
    if (n >= slides.length) {slideIndex = 0}
    if (n < 0) {slideIndex = slides.length - 1}
    
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    
    // Show the current slide
    slides[slideIndex].style.opacity = "1";
}

// Optional: Auto-advance slides every 5 seconds
setInterval(() => changeSlide(1), 5000); 