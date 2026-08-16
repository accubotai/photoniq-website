/* global Chart */
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

  // --- Chart.js Initializations ---

  // 1. Problem Chart (Energy Demand vs Silicon Limits)
  const problemCtx = document.getElementById('problemChart');
  if (problemCtx) {
    new Chart(problemCtx, {
      type: 'line',
      data: {
        labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'],
        datasets: [
          {
            label: 'AI Energy Demand',
            data: [50, 80, 150, 250, 400, 600, 850, 1200, 1600],
            borderColor: '#ff2a55',
            backgroundColor: 'rgba(255, 42, 85, 0.1)',
            borderWidth: 3,
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#ff2a55',
          },
          {
            label: 'Silicon Efficiency Limits',
            data: [400, 500, 560, 600, 630, 650, 660, 665, 668],
            borderColor: '#00f0ff',
            borderWidth: 3,
            borderDash: [5, 5],
            tension: 0.4,
            pointBackgroundColor: '#00f0ff',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#fff' } },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { ticks: { color: '#a0a0b5' }, grid: { color: 'rgba(255,255,255,0.1)' } },
          y: { ticks: { color: '#a0a0b5' }, grid: { color: 'rgba(255,255,255,0.1)' } },
        },
      },
    });
  }

  // 2. Financial Chart
  const financialCtx = document.getElementById('financialChart');
  if (financialCtx) {
    new Chart(financialCtx, {
      type: 'bar',
      data: {
        labels: ['2025', '2026', '2027', '2028', '2029'],
        datasets: [
          {
            type: 'line',
            label: 'Operating Margin (%)',
            data: [12, 15, 19, 24, 30],
            borderColor: '#ff2a55',
            borderWidth: 3,
            yAxisID: 'y1',
            tension: 0.3,
            pointBackgroundColor: '#ff2a55',
          },
          {
            type: 'bar',
            label: 'Revenue (USD M)',
            data: [42, 58, 81, 114, 158],
            backgroundColor: 'rgba(0, 240, 255, 0.8)',
            borderRadius: 6,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: '#fff' } },
          tooltip: { mode: 'index', intersect: false },
        },
        scales: {
          x: { ticks: { color: '#a0a0b5' }, grid: { display: false } },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            ticks: { color: '#00f0ff' },
            grid: { color: 'rgba(255,255,255,0.1)' },
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            ticks: { color: '#ff2a55' },
            grid: { display: false },
          },
        },
      },
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
