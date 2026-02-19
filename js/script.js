document.addEventListener("DOMContentLoaded", function () {

  /* ===========================
     FIX MOBILE 100VH ISSUE
  ============================ */

  function setRealHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }

  setRealHeight();
  window.addEventListener('resize', setRealHeight);

  /* ===========================
     AOS INITIALIZATION
  ============================ */

  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });
  }

  /* ===========================
     COUNTER ANIMATION
  ============================ */

  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.stats');

  if (counters.length && statsSection) {

    let counterStarted = false;

    function startCounters() {
      counters.forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const duration = 1200;
        const startTime = performance.now();

        function update(currentTime) {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          counter.innerText = Math.floor(progress * target);
          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        }

        requestAnimationFrame(update);
      });
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !counterStarted) {
          counterStarted = true;
          startCounters();
        }
      });
    }, { threshold: 0.4 });

    observer.observe(statsSection);
  }

  /* ===========================
     SWIPER: LEGAL ANSWERS
  ============================ */

  if (document.querySelector('.answersSwiper')) {
    new Swiper(".answersSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".answers-next",
        prevEl: ".answers-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
  }

  /* ===========================
     SWIPER: TESTIMONIALS
  ============================ */

  if (document.querySelector('.clientSwiper')) {
    new Swiper(".clientSwiper", {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      speed: 700,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".testimonial-next",
        prevEl: ".testimonial-prev",
      },
      breakpoints: {
        768: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
  }

});













/* ================= MOBILE MENU TOGGLE ================= */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.add("active");
  document.body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  document.body.style.overflow = "auto";
});
