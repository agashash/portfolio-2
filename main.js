/**
 * Anand M (nexora_pics) - Portfolio Scripts
 * Professional Product Image Retouching
 */

document.addEventListener("DOMContentLoaded", () => {

  // ===================================================
  // 1. LOADING SCREEN ANIMATION
  // ===================================================
  const loadingScreen = document.getElementById("loading-screen");
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");

  function showElement(element, delay = 0) {
    if (!element) return;
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  if (loadingScreen) {
    showElement(loadingText, 100);
    showElement(mainIcon, 700);
    subIcons.forEach((icon, idx) => {
      showElement(icon, 1400 + idx * 300);
    });
    showElement(designerText, 2500);

    setTimeout(() => {
      loadingScreen.style.transition = "opacity 0.6s ease";
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 600);

      // Safe check so it doesn't throw error if main-page ID isn't present
      if (mainPage) {
        mainPage.classList.add("visible");
      }
    }, 3600);
  }

  // ===================================================
  // 2. TYPING EFFECT (Anand M's Retouching Profile)
  // ===================================================
  const typingElement = document.querySelector('.info-home h3');
  const words = [
    "Infographics Designer",
    "Image Resizing",
    "Lifestyle Mockups",
    "Background Removal",
    "Retouching & Color Correction"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;

  function type() {
    if (!typingElement) return;

    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);

    typingElement.innerHTML = `${displayedText}<span class="typing-cursor">|</span>`;

    if (!isDeleting && charIndex < currentWord.length) {
      charIndex++;
      setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(type, typingSpeed / 2);
    } else {
      isDeleting = !isDeleting;
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 1500 : 500);
    }
  }

  type();

  // ===================================================
  // 3. BACK TO TOP BUTTON
  // ===================================================
  const backToTop = document.createElement('div');
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backToTop.id = "back-to-top";
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #474af0;
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(71, 74, 240, 0.35);
    transition: transform 0.3s ease, background 0.3s ease;
  `;

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  backToTop.addEventListener('mouseenter', () => {
    backToTop.style.transform = 'translateY(-4px) scale(1.08)';
    backToTop.style.background = '#2c36d9';
  });

  backToTop.addEventListener('mouseleave', () => {
    backToTop.style.transform = 'translateY(0) scale(1)';
    backToTop.style.background = '#474af0';
  });

  // ===================================================
  // 4. SCROLL REVEAL ANIMATION
  // ===================================================
  const revealElements = document.querySelectorAll(
    '.home-container, .about-container, .projects-container, .services-container, .contact-content'
  );
  revealElements.forEach(el => el.classList.add('reveal'));

  function handleScrollReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 100;
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active-reveal');
      }
    });
  }

  // Trigger once on initial load so above-the-fold content shows immediately
  handleScrollReveal();

  // ===================================================
  // 5. NAVBAR ACTIVE STATE & SCROLL-SPY
  // ===================================================
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');

  function removeActive() {
    navLinks.forEach(link => {
      if (link.parentElement) {
        link.parentElement.classList.remove('active');
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.getElementById(targetId.substring(1));
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 70,
            behavior: 'smooth'
          });
          removeActive();
          link.parentElement.classList.add('active');
        }
      }
    });
  });

  // Scroll listener for back-to-top, scroll spy & reveals
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;

    // Scroll-Spy
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
        if (activeLink && activeLink.parentElement) {
          activeLink.parentElement.classList.add('active');
        }
      }
    });

    // Back to top visibility
    if (window.scrollY > 400) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }

    // Scroll reveal
    handleScrollReveal();
  });

  // ===================================================
  // 6. CONTACT FORM SUBMISSION
  // ===================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.btn-send');
      const originalText = submitBtn.innerText;

      submitBtn.disabled = true;
      submitBtn.innerText = "Sending Message...";

      setTimeout(() => {
        alert("Thank you! Your message has been sent to Anand M. I will get back to you within 1 hour!");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerText = originalText;
      }, 1000);
    });
  }

});


const form = document.getElementById('contact-form');

if (form) {
  const btn = form.querySelector('.btn-send');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btn.textContent = 'Sent!';
        btn.style.backgroundColor = '#16a34a'; // பச்சை நிறம்
        form.reset();
      } else {
        btn.textContent = 'Error!';
        btn.style.backgroundColor = '#dc2626'; // சிவப்பு நிறம்
      }
    } catch (err) {
      btn.textContent = 'Error!';
      btn.style.backgroundColor = '#dc2626';
    }

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Send Brief & Get Quote';
      btn.style.backgroundColor = '#4f46e5';
    }, 3000);
  });
}