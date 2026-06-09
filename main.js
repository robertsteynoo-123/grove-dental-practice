document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Sticky Header Scroll Indicator & Floating CTA
  // ==========================================================================
  const header = document.getElementById('top');
  const floatingCta = document.getElementById('floatingCta');
  const bookingSection = document.getElementById('booking');

  const handleScroll = () => {
    // Header scrolled background styling
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Hide floating CTA when user is already in the booking section
    if (bookingSection) {
      const rect = bookingSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      if (isVisible) {
        floatingCta.classList.add('hidden');
      } else {
        floatingCta.classList.remove('hidden');
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger immediately to capture initial state

  // ==========================================================================
  // 2. Mobile Navigation Toggle (Hamburger)
  // ==========================================================================
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMenu = () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Prevent background scrolling when menu is open on mobile
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  navToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu if user clicks outside of the nav menu area
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      toggleMenu();
    }
  });

  // ==========================================================================
  // 3. Scroll Spy (Highlight active navigation item)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  
  const scrollSpy = () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // Account for sticky header offset
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      
      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => link.classList.remove('active'));
          navLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);

  // ==========================================================================
  // 4. "25+ Years" Scrolling Counter Animation
  // ==========================================================================
  const yearsCounter = document.getElementById('years-counter');
  
  if (yearsCounter) {
    let started = false;
    const target = parseInt(yearsCounter.getAttribute('data-target'), 10) || 25;
    
    const startCounter = () => {
      let currentNum = 0;
      const duration = 1500; // Total count duration in ms
      const stepTime = Math.floor(duration / target);
      
      const timer = setInterval(() => {
        currentNum++;
        yearsCounter.textContent = currentNum;
        if (currentNum >= target) {
          clearInterval(timer);
          yearsCounter.textContent = target; // Ensure exact ending
        }
      }, stepTime);
    };

    // Use Intersection Observer for trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only run once and check reduced-motion preferences
        if (entry.isIntersecting && !started) {
          started = true;
          const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          if (prefersReduced) {
            yearsCounter.textContent = target; // Display immediately
          } else {
            startCounter();
          }
        }
      });
    }, { threshold: 0.5 });

    observer.observe(yearsCounter);
  }

  // ==========================================================================
  // 5. Interactive Practice Timeline
  // ==========================================================================
  const nodes = document.querySelectorAll('.timeline-node');
  const panels = document.querySelectorAll('.timeline-panel');
  const timelineNav = document.querySelector('.timeline-navigation');

  if (nodes.length > 0 && panels.length > 0) {
    const switchTimelineTab = (index) => {
      // Deactivate all nodes and panels
      nodes.forEach(node => {
        node.classList.remove('active');
        node.setAttribute('aria-selected', 'false');
        node.setAttribute('tabindex', '-1');
      });

      panels.forEach(panel => {
        panel.classList.remove('active');
        panel.setAttribute('hidden', 'true');
      });

      // Activate selected node and panel
      const activeNode = nodes[index];
      const activePanel = panels[index];

      activeNode.classList.add('active');
      activeNode.setAttribute('aria-selected', 'true');
      activeNode.setAttribute('tabindex', '0');
      activeNode.focus();

      activePanel.classList.add('active');
      activePanel.removeAttribute('hidden');
    };

    nodes.forEach((node, idx) => {
      node.addEventListener('click', () => switchTimelineTab(idx));
    });

    // Keyboard Arrow navigation for tablist
    if (timelineNav) {
      timelineNav.addEventListener('keydown', (e) => {
        let activeIdx = Array.from(nodes).indexOf(document.activeElement);
        if (activeIdx === -1) return;

        let nextIdx;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          nextIdx = (activeIdx + 1) % nodes.length;
          switchTimelineTab(nextIdx);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          nextIdx = (activeIdx - 1 + nodes.length) % nodes.length;
          switchTimelineTab(nextIdx);
        } else if (e.key === 'Home') {
          e.preventDefault();
          switchTimelineTab(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          switchTimelineTab(nodes.length - 1);
        }
      });
    }
  }

  // ==========================================================================
  // 6. Interactive Services Grid (Expand details below row)
  // ==========================================================================
  const triggers = document.querySelectorAll('.service-trigger');
  const svcPanels = document.querySelectorAll('.service-panel');
  const detailsWrapper = document.querySelector('.service-details-wrapper');

  if (triggers.length > 0 && svcPanels.length > 0) {
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);
        const isCurrentlyExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Reset all triggers and panels
        triggers.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-expanded', 'false');
        });
        
        svcPanels.forEach(p => {
          p.classList.remove('active');
        });

        if (!isCurrentlyExpanded) {
          // Open target
          trigger.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
          targetPanel.classList.add('active');
          detailsWrapper.classList.add('expanded');
          
          // Smooth scroll to display panel clearly
          setTimeout(() => {
            targetPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        } else {
          // Collapse
          detailsWrapper.classList.remove('expanded');
        }
      });
    });
  }

  // ==========================================================================
  // 7. Google Reviews Carousel (Autoplay, pause, arrow controls, dots, a11y)
  // ==========================================================================
  const slides = document.querySelectorAll('.carousel-slide');
  const carouselInner = document.getElementById('carouselInner');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const playPauseBtn = document.getElementById('carouselPlayPause');
  
  if (slides.length > 0) {
    let currentSlide = 0;
    let isPlaying = true;
    let rotateInterval;
    const intervalTime = 6000; // 6 seconds

    // A. Create dots indicators
    slides.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goToSlide(idx);
        pauseCarousel();
      });
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.carousel-dot');

    // B. Switch to Slide function
    const goToSlide = (index) => {
      // Hide old active slide
      slides[currentSlide].classList.remove('active');
      slides[currentSlide].setAttribute('hidden', 'true');
      slides[currentSlide].setAttribute('tabindex', '-1');
      dots[currentSlide].classList.remove('active');
      dots[currentSlide].setAttribute('aria-selected', 'false');

      // Set index
      currentSlide = (index + slides.length) % slides.length;

      // Show new slide
      slides[currentSlide].classList.add('active');
      slides[currentSlide].removeAttribute('hidden');
      slides[currentSlide].setAttribute('tabindex', '0');
      dots[currentSlide].classList.add('active');
      dots[currentSlide].setAttribute('aria-selected', 'true');
    };

    const nextSlide = () => goToSlide(currentSlide + 1);
    const prevSlide = () => goToSlide(currentSlide - 1);

    // C. Auto Rotation Loops
    const startCarousel = () => {
      isPlaying = true;
      playPauseBtn.textContent = '⏸';
      playPauseBtn.setAttribute('aria-label', 'Pause auto rotation');
      
      // Clear safety check
      clearInterval(rotateInterval);
      
      // Don't auto rotate if reduced motion preference is set
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        rotateInterval = setInterval(nextSlide, intervalTime);
      }
    };

    const pauseCarousel = () => {
      isPlaying = false;
      playPauseBtn.textContent = '▶';
      playPauseBtn.setAttribute('aria-label', 'Play auto rotation');
      clearInterval(rotateInterval);
    };

    // Event hooks
    prevBtn.addEventListener('click', () => {
      prevSlide();
      pauseCarousel();
    });

    nextBtn.addEventListener('click', () => {
      nextSlide();
      pauseCarousel();
    });

    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseCarousel();
      } else {
        startCarousel();
      }
    });

    // Pause on hover
    if (carouselInner) {
      carouselInner.addEventListener('mouseenter', () => {
        if (isPlaying) clearInterval(rotateInterval);
      });
      
      carouselInner.addEventListener('mouseleave', () => {
        if (isPlaying) {
          clearInterval(rotateInterval);
          rotateInterval = setInterval(nextSlide, intervalTime);
        }
      });
    }

    // Keyboard support inside carousel container
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
          pauseCarousel();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
          pauseCarousel();
        }
      });
    }

    // Initialize carousel loop
    startCarousel();
  }

  // ==========================================================================
  // 8. FAQ Accordion (Single-expansion logic)
  // ==========================================================================
  const faqTriggers = document.querySelectorAll('.faq-trigger');
  
  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const targetPanelId = trigger.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);

      // Close all FAQs first
      faqTriggers.forEach(t => {
        t.setAttribute('aria-expanded', 'false');
        const pId = t.getAttribute('aria-controls');
        const p = document.getElementById(pId);
        p.style.display = 'none';
      });

      if (!isExpanded) {
        // Open selected FAQ
        trigger.setAttribute('aria-expanded', 'true');
        targetPanel.style.display = 'block';
      }
    });
  });

  // ==========================================================================
  // 9. Form Validation & Formspree Submit Handlers
  // ==========================================================================
  const bookingForm = document.getElementById('bookingForm');
  const formSuccess = document.getElementById('formSuccessMessage');
  const formError = document.getElementById('formErrorMessage');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent standard page redirecting

      let isValid = true;
      const requiredInputs = bookingForm.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        let isFieldValid = true;
        const errorMsg = document.getElementById(`error-${input.id.replace('form-', '')}`);

        // Empty validation
        if (!input.value.trim()) {
          isFieldValid = false;
        } 
        // Email pattern validation
        else if (input.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          isFieldValid = emailPattern.test(input.value.trim());
        } 
        // Phone number pattern validation
        else if (input.type === 'tel') {
          const phonePattern = /^[\d\s()+-]{7,15}$/;
          isFieldValid = phonePattern.test(input.value.trim());
        }

        if (!isFieldValid) {
          isValid = false;
          input.classList.add('invalid');
          input.setAttribute('aria-invalid', 'true');
          if (errorMsg) errorMsg.classList.add('visible');
        } else {
          input.classList.remove('invalid');
          input.removeAttribute('aria-invalid');
          if (errorMsg) errorMsg.classList.remove('visible');
        }
      });

      // If valid, submit to Formspree using AJAX
      if (isValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Request...';
        
        const data = new FormData(bookingForm);

        fetch(bookingForm.action, {
          method: bookingForm.method,
          body: data,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            // Success
            bookingForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            formError.style.display = 'none';
            
            // Focus on success message for screen readers
            formSuccess.focus();
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          } else {
            // Server error
            throw new Error('Formspree rejection');
          }
        })
        .catch(() => {
          // Catch block handles fetch network errors or server failures
          formError.style.display = 'flex';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Booking Request';
          
          formError.focus();
          formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
      }
    });

    // Real-time error removal on text input
    const allInputs = bookingForm.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.trim()) {
          input.classList.remove('invalid');
          input.removeAttribute('aria-invalid');
          const errId = `error-${input.id.replace('form-', '')}`;
          const errText = document.getElementById(errId);
          if (errText) errText.classList.remove('visible');
        }
      });
    });
  }

  // ==========================================================================
  // 10. GDPR Cookie Consent & Dynamic Google Map Loader
  // ==========================================================================
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAcceptBtn = document.getElementById('cookieAcceptBtn');
  const cookieDeclineBtn = document.getElementById('cookieDeclineBtn');
  const mapContainer = document.getElementById('mapContainer');
  const mapConsentPlaceholder = document.getElementById('mapConsentPlaceholder');
  const acceptMapBtn = document.getElementById('acceptMapBtn');

  const COOKIE_PREF_KEY = 'grove_cookie_consent';

  const loadGoogleMap = () => {
    // Hide placeholder consent screen
    if (mapConsentPlaceholder) {
      mapConsentPlaceholder.style.display = 'none';
    }

    // Create iframe element
    const iframe = document.createElement('iframe');
    iframe.className = 'map-iframe';
    iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.597654167439!2d0.039209577265935785!3d51.53896507182121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a649d09c2aef%3A0x88981f9a850cae25!2s21%20Plashet%20Grove%2C%20London%20E6%201AD!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk';
    iframe.title = 'Grove Dental Practice location map on Plashet Grove';
    iframe.loading = 'lazy';
    iframe.setAttribute('aria-label', 'Google Map showing practice location');
    
    // Add to DOM
    mapContainer.appendChild(iframe);
  };

  const checkCookieConsent = () => {
    const consent = localStorage.getItem(COOKIE_PREF_KEY);
    
    if (consent === 'accepted') {
      // Already accepted, load map directly and keep banner hidden
      loadGoogleMap();
      cookieBanner.setAttribute('hidden', 'true');
    } else if (consent === 'declined') {
      // Declined, keep map placeholder visible, keep banner hidden
      cookieBanner.setAttribute('hidden', 'true');
    } else {
      // No preference yet, show banner
      cookieBanner.removeAttribute('hidden');
    }
  };

  // Click actions for cookie actions
  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', () => {
      localStorage.setItem(COOKIE_PREF_KEY, 'accepted');
      cookieBanner.setAttribute('hidden', 'true');
      loadGoogleMap();
    });
  }

  if (cookieDeclineBtn) {
    cookieDeclineBtn.addEventListener('click', () => {
      localStorage.setItem(COOKIE_PREF_KEY, 'declined');
      cookieBanner.setAttribute('hidden', 'true');
    });
  }

  // Accept button directly in map placeholder area
  if (acceptMapBtn) {
    acceptMapBtn.addEventListener('click', () => {
      localStorage.setItem(COOKIE_PREF_KEY, 'accepted');
      cookieBanner.setAttribute('hidden', 'true');
      loadGoogleMap();
    });
  }

  // Initialize consent check
  checkCookieConsent();
});
