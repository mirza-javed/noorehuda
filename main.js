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
