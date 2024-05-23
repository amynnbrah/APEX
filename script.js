document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelector(".slides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots-container");

  let slideIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Create dots dynamically based on the number of slides
  function createDots() {
    for (let i = 0; i < slides.children.length; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", function () {
        goToSlide(i);
      });
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  // Update dot indicators
  function updateDots() {
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  // Show slide
  function goToSlide(index) {
    slideIndex = index;
    slides.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  // Previous slide
  function prevSlide() {
    if (slideIndex > 0) {
      goToSlide(slideIndex - 1);
    } else {
      goToSlide((slideIndex = slides.children.length - 1));
    }
  }

  // Next slide
  function nextSlide() {
    if (slideIndex < slides.children.length - 1) {
      goToSlide(slideIndex + 1);
    } else {
      goToSlide((slideIndex = 0));
    }
  }

  // Touch events for slide navigation
  slides.addEventListener("touchstart", function(event) {
    touchStartX = event.touches[0].clientX;
  });

  slides.addEventListener("touchend", function(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (swipeDistance > 50) {
      prevSlide(); // Swipe right
    } else if (swipeDistance < -50) {
      nextSlide(); // Swipe left
    }
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  // Initialize slide navigation
  createDots();
});
