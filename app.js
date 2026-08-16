document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // Intersection Observer for scroll animations (fade in up)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: Stop observing once animated
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-up').forEach((element) => {
    observer.observe(element);
  });

  // Subtle glow cursor effect
  const glowCursor = document.getElementById('glow-cursor');
  if (glowCursor) {
    document.addEventListener('mousemove', (e) => {
      requestAnimationFrame(() => {
        glowCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      });
    });
  }
  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  if (lightbox && lightboxImg && lightboxClose) {
    document.querySelectorAll('.enlargeable').forEach((img) => {
      img.addEventListener('click', function () {
        lightbox.style.display = 'block';
        lightboxImg.src = this.src;
      });
    });

    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
      if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
      }
    });
  }
});
