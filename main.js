document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });
  }

  // Hero Slider
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length > 0) {
    const nextSlide = () => {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    const goToSlide = (index) => {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = index;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(index);
        slideInterval = setInterval(nextSlide, 5000);
      });
    });

    slideInterval = setInterval(nextSlide, 5000);
  }

  // Lightbox for Classes
  const classCards = document.querySelectorAll('.class-card');
  const lightbox = document.getElementById('lightbox');
  
  if (classCards.length > 0 && lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxArabic = document.getElementById('lightbox-arabic');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');

    classCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('.class-img').src;
        const title = card.querySelector('.class-title').textContent;
        const arabic = card.querySelector('.class-arabic').textContent;
        const desc = card.querySelector('.class-desc').textContent;

        lightboxImg.src = img;
        lightboxTitle.textContent = title;
        lightboxArabic.textContent = arabic;
        lightboxDesc.textContent = desc;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        const errorElement = document.getElementById(`${field.id}Error`);
        if (!field.value.trim()) {
          isValid = false;
          if (errorElement) errorElement.style.display = 'block';
          field.style.borderColor = '#d9534f';
        } else {
          if (errorElement) errorElement.style.display = 'none';
          field.style.borderColor = '#ddd';
        }
      });

      if (isValid) {
        const studentName = document.getElementById('studentName').value;
        const fatherName = document.getElementById('fatherName').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const course = document.getElementById('course').value;
        const message = document.getElementById('message').value;

        const whatsappMessage = `Assalamu Alaikum, New Student Enrollment Inquiry from Noore Huda Website:
Student Name: ${studentName}
Father Name: ${fatherName}
Email: ${email}
WhatsApp: ${whatsapp}
Interested Course: ${course}
Message: ${message}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/923218749474?text=${encodedMessage}`;
        
        window.open(whatsappUrl, '_blank');
      }
    });
  }

  // Lazy loading background images
  if ('IntersectionObserver' in window) {
    const lazyBackgrounds = document.querySelectorAll('.lazy-bg');
    const bgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lazyBg = entry.target;
          lazyBg.style.backgroundImage = `url(${lazyBg.dataset.bg})`;
          lazyBg.classList.remove('lazy-bg');
          observer.unobserve(lazyBg);
        }
      });
    });

    lazyBackgrounds.forEach(lazyBg => {
      bgObserver.observe(lazyBg);
    });
  }
});
