const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      if (entry.target.classList.contains('counter')) return;
      if (entry.target.dataset.animate !== undefined) {
        entry.target.classList.add('active');
      }
    }
  });
}, {
  threshold: 0.18,
});

document.querySelectorAll('[data-animate]').forEach((el) => observer.observe(el));
document.querySelectorAll('.counter').forEach((counter) => observer.observe(counter));

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const target = +entry.target.dataset.target;
    const duration = 1800;
    let start = 0;
    const stepTime = Math.max(20, duration / target);
    const timer = setInterval(() => {
      start += 1;
      entry.target.textContent = start;
      if (start >= target) {
        clearInterval(timer);
        entry.target.textContent = target;
      }
    }, stepTime);
    obs.unobserve(entry.target);
  });
}, { threshold: 0.4 });

counters.forEach((counter) => counterObserver.observe(counter));

const filterButtons = document.querySelectorAll('.filter-button');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    portfolioItems.forEach((item) => {
      const category = item.dataset.category;
      const shouldShow = filter === 'all' || category === filter;
      item.style.display = shouldShow ? 'grid' : 'none';
    });
  });
});

const lightbox = document.querySelector('#lightbox');
const instagramFrame = lightbox.querySelector('iframe');
const body = document.body;
const portfolioThumbnails = document.querySelectorAll('.portfolio-item');
const lightboxClose = document.querySelector('.lightbox-close');

function getInstagramEmbedUrl(url) {
  if (!url) return '';
  try {
    const parsed = new URL(url, window.location.href);
    const path = parsed.pathname.replace(/\/$/, '');
    if (path.includes('/reel/')) {
      return `https://www.instagram.com${path}/embed/`;
    }
    if (path.includes('/p/')) {
      return `https://www.instagram.com${path}/embed/`;
    }
    return url;
  } catch {
    return url;
  }
}

function openLightbox(src) {
  instagramFrame.src = src;
  lightbox.classList.add('show');
  lightbox.setAttribute('aria-hidden', 'false');
  body.classList.add('modal-open');
}

portfolioThumbnails.forEach((item) => {
  item.addEventListener('click', () => {
    const instagramUrl = item.dataset.video;
    if (!instagramUrl) return;

    const embedUrl = getInstagramEmbedUrl(instagramUrl);
    openLightbox(embedUrl);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox || event.target.classList.contains('lightbox-backdrop')) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('show')) {
    closeLightbox();
  }
});

function closeLightbox() {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden', 'true');
  body.classList.remove('modal-open');
  instagramFrame.src = '';
}

const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
const testimonialText = document.querySelector('.testimonial-text');
const testimonialName = document.querySelector('.testimonial-name');
const testimonialRole = document.querySelector('.testimonial-role');
let activeIndex = 0;

const testimonialsData = [
  {
    text: 'My best girl, this is super.',
    name: 'Ms Linda',
    role: 'Realtor, luminous Hills',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    text: 'Aww this is clean',
    name: 'Jordan Wells',
    role: 'Marketing Lead, Bright Media',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },

];

const testimonialAvatar = document.querySelector('.testimonial-avatar');

function updateTestimonials(index) {
  const active = testimonialsData[index];
  testimonialText.textContent = active.text;
  testimonialName.textContent = active.name;
  testimonialRole.textContent = active.role;
  testimonialAvatar.src = active.avatar;
  testimonialAvatar.alt = active.name;
}

prevBtn.addEventListener('click', () => {
  activeIndex = activeIndex > 0 ? activeIndex - 1 : testimonialsData.length - 1;
  updateTestimonials(activeIndex);
});

nextBtn.addEventListener('click', () => {
  activeIndex = activeIndex < testimonialsData.length - 1 ? activeIndex + 1 : 0;
  updateTestimonials(activeIndex);
});

setInterval(() => {
  activeIndex = activeIndex < testimonialsData.length - 1 ? activeIndex + 1 : 0;
  updateTestimonials(activeIndex);
}, 8000);

const contactForm = document.querySelector('#contactForm');
const formFeedback = contactForm.querySelector('.form-feedback');

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = contactForm.email.value.trim();
  const message = contactForm.message.value.trim();
  if (!email || !message) {
    formFeedback.textContent = 'Please provide both email and a short project brief.';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formFeedback.textContent = 'Please enter a valid email address.';
    return;
  }
  formFeedback.textContent = 'Thanks! Your message is ready to be sent.';
  contactForm.reset();
});

// Hamburger mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const siteHeader = document.querySelector('.site-header');
const mainNav = document.querySelector('.main-nav');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    siteHeader.classList.toggle('nav-open');
  });
}

// toggle hamburger icon between bars and x
const hambIcon = hamburger ? hamburger.querySelector('i') : null;
if (hambIcon) {
  hamburger.addEventListener('click', () => {
    if (hambIcon.classList.contains('fa-bars')) {
      hambIcon.classList.remove('fa-bars');
      hambIcon.classList.add('fa-xmark');
    } else {
      hambIcon.classList.remove('fa-xmark');
      hambIcon.classList.add('fa-bars');
    }
  });
}

// Close nav when a nav link is clicked (mobile)
document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    if (siteHeader.classList.contains('nav-open')) {
      siteHeader.classList.remove('nav-open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
});

// Close nav on Escape or click outside
document.addEventListener('click', (e) => {
  if (!siteHeader.classList.contains('nav-open')) return;
  const isClickInside = siteHeader.contains(e.target);
  if (!isClickInside) {
    siteHeader.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && siteHeader.classList.contains('nav-open')) {
    siteHeader.classList.remove('nav-open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});
