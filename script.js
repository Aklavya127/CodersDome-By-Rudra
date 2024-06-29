document.addEventListener('DOMContentLoaded', function () {
  // Set the current year in the footer
  document.getElementById('currentYear').innerText = new Date().getFullYear();

  // Course slider functionality
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');

  let currentSlide = 0;
  let slideWidth = slides[0].offsetWidth;
  let numSlidesToShow = Math.floor(slider.offsetWidth / slideWidth);

  prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - numSlidesToShow;
    updateSlider();
  });

  nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide < slides.length - numSlidesToShow) ? currentSlide + 1 : 0;
    updateSlider();
  });

  function updateSlider() {
    slideWidth = slides[0].offsetWidth;
    numSlidesToShow = Math.floor(slider.offsetWidth / slideWidth);
    const totalSlides = slides.length;
    const maxSlideIndex = totalSlides - numSlidesToShow;

    if (currentSlide > maxSlideIndex) {
      currentSlide = maxSlideIndex;
    }

    const translateXValue = currentSlide * slideWidth * -1;
    slider.style.transform = `translateX(${translateXValue}px)`;
  }

  // Handle responsive behavior
  window.addEventListener('resize', updateSlider);

  // Hover effect for image resizing
  slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => {
      slide.style.transform = 'scale(1.05)';
      slide.style.transition = 'transform 0.3s ease';
    });

    slide.addEventListener('mouseleave', () => {
      slide.style.transform = 'scale(1)';
      slide.style.transition = 'transform 0.3s ease';
    });
  });

  // Smooth scrolling function
  function smoothScroll(target) {
    const element = document.getElementById(target);
    if (element) {
      window.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
      });
    }
  }

  // Add event listeners to navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = this.getAttribute('href').substring(1);
      smoothScroll(target);
    });
  });

  // Toggle visibility of course description
  const courseItems = document.querySelectorAll(".course-item");

  courseItems.forEach(item => {
    item.addEventListener("click", function () {
      const description = this.querySelector(".course-description");
      if (description) {
        description.classList.toggle("show-description");
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');

  searchButton.addEventListener('click', function () {
    const query = searchInput.value.trim();

    if (query !== '') {
      window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    } else {
      alert('Please enter a search query.');
    }
  });

  // Initial update of slider on page load
  updateSlider();
});
