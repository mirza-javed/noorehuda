document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile Menu Toggle ───
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const hamburgerClose = document.querySelector('.hamburger-close');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });

    // Close button inside mobile menu
    if (hamburgerClose) {
      hamburgerClose.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    }

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ─── Active Navigation Indicator ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || 
        (currentPage === '' && href === 'index.html') ||
        (currentPage === 'index.html' && href === 'index.html')) {
      // Only mark as active if it's a page link (not an anchor)
      if (!href.startsWith('#') && !href.includes('#')) {
        link.classList.add('active');
      }
    }
    if (href === 'about.html' && currentPage === 'about.html') {
      link.classList.add('active');
    }
    if (href === 'droos.html' && currentPage === 'droos.html') {
      link.classList.add('active');
    }
  });

  // ─── Scroll-Triggered Animations ───
  const scrollElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .stagger-children');

  if (scrollElements.length > 0) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target); // Animate only once
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    scrollElements.forEach(el => scrollObserver.observe(el));
  }

  // ─── Scroll-to-Top Button ───
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Lightbox for Classes ───
  const classCards = document.querySelectorAll('.class-card');
  const lightbox = document.getElementById('lightbox');
  
  if (classCards.length > 0 && lightbox) {
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxArabic = document.getElementById('lightbox-arabic');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxClose = document.querySelector('.lightbox-close');

    classCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open lightbox if clicking a button/link inside the card
        if (e.target.closest('.btn') || e.target.closest('a')) return;

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

    // Close lightbox on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // ─── Contact Form Submission ───
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
          field.classList.add('has-error');
        } else {
          if (errorElement) errorElement.style.display = 'none';
          field.classList.remove('has-error');
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

});
