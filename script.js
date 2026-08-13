document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------
  // ELEMENTS
  // -------------------------------
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backTop = document.getElementById("backTop");
  const year = document.getElementById("year");

  // -------------------------------
  // CURRENT YEAR
  // -------------------------------
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // -------------------------------
  // MOBILE MENU
  // -------------------------------
  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

    });

  }

  // -------------------------------
  // CLOSE MOBILE MENU
  // -------------------------------
  document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
          "aria-label",
          "Open navigation"
        );
      }

    });

  });

  // -------------------------------
  // NAVBAR SCROLL EFFECT
  // -------------------------------
  function handleScroll() {

    const scrollPosition = window.scrollY;

    if (navbar) {
      navbar.classList.toggle(
        "scrolled",
        scrollPosition > 10
      );
    }

    // Back to top button
    if (backTop) {
      backTop.classList.toggle(
        "show",
        scrollPosition > 500
      );
    }

    updateActiveNavigation();
  }

  window.addEventListener(
    "scroll",
    handleScroll,
    { passive: true }
  );

  // -------------------------------
  // ACTIVE NAVIGATION
  // -------------------------------
  function updateActiveNavigation() {

    const sections = document.querySelectorAll(
      "main section[id]"
    );

    let currentSection = "home";

    sections.forEach(section => {

      const sectionTop =
        section.offsetTop - 180;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }

    });

    document
      .querySelectorAll(".nav-links > a:not(.nav-cta)")
      .forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
          "active",
          href === `#${currentSection}`
        );

      });

  }

  // -------------------------------
  // BACK TO TOP
  // -------------------------------
  if (backTop) {

    backTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }

  // -------------------------------
  // SCROLL REVEAL ANIMATION
  // -------------------------------
  const revealElements =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    // Fallback for old browsers
    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }

  // -------------------------------
  // SMOOTH SCROLL
  // -------------------------------
  document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

      anchor.addEventListener("click", function (event) {

        const targetId =
          this.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          const navbarHeight =
            navbar
              ? navbar.offsetHeight
              : 0;

          const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            navbarHeight -
            15;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
          });

        }

      });

    });

  // -------------------------------
  // SERVICE CARD HOVER
  // -------------------------------
  document
    .querySelectorAll(".service-card")
    .forEach(card => {

      card.addEventListener("mouseenter", () => {
        card.style.setProperty(
          "--hover-scale",
          "1"
        );
      });

      card.addEventListener("mouseleave", () => {
        card.style.removeProperty(
          "--hover-scale"
        );
      });

    });

  // -------------------------------
  // ESC KEY CLOSE MENU
  // -------------------------------
  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      if (navLinks) {
        navLinks.classList.remove("open");
      }

      if (menuToggle) {
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
      }

    }

  });

  // -------------------------------
  // INITIAL STATE
  // -------------------------------
  handleScroll();

});
