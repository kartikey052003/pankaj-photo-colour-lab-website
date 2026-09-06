const business = {
  phoneDisplay: "+91 94526 56025",
  phoneHref: "tel:+919452656025",
  whatsappHref: "https://wa.me/919839602777",
  emailDisplay: "pankajphotocolour@gmail.com",
  emailHref: "mailto:pankajphotocolour@gmail.com",
  whatsappMessage:
    "Hello Pankaj Photo colour lab & Digital Photo Studio, I would like to enquire about a photography shoot in India."
};

const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");

// Cache DOM queries - run once instead of repeatedly
const navLinks = [...document.querySelectorAll(".nav-panel a")];
const callLinks = document.querySelectorAll("[data-call-link]");
const whatsappLinks = document.querySelectorAll("[data-whatsapp-link]");
const phoneTextLinks = document.querySelectorAll("[data-phone-text]");
const emailLinks = document.querySelectorAll("[data-email-link]");
const yearEl = document.querySelector("[data-year]");

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

// Optimize: Use passive event listeners and debounce scroll
const setHeaderState = () => {
  const shouldBeScrolled = window.scrollY > 24;
  header?.classList.toggle("is-scrolled", shouldBeScrolled);
};

const closeNav = () => {
  document.body.classList.remove("nav-open");
  navPanel?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open menu");
};

const openNav = () => {
  document.body.classList.add("nav-open");
  navPanel?.classList.add("is-open");
  navToggle?.setAttribute("aria-expanded", "true");
  navToggle?.setAttribute("aria-label", "Close menu");
};

navToggle?.addEventListener("click", () => {
  const isOpen = navPanel?.classList.contains("is-open");
  isOpen ? closeNav() : openNav();
});

// Use event delegation for nav links to reduce listener count
navPanel?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeNav();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

// Optimize: Reduce IntersectionObserver threshold for better performance
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
      link.toggleAttribute("aria-current", isActive);
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.15] // Reduced from 3 thresholds to 1 for better performance
  }
);

sections.forEach((section) => sectionObserver.observe(section));

// Batch DOM updates - set all links at once
const whatsappUrl = business.whatsappHref
  ? `${business.whatsappHref}?text=${encodeURIComponent(business.whatsappMessage)}`
  : "#contact";

callLinks.forEach((link) => {
  link.href = business.phoneHref || "#contact";
});

whatsappLinks.forEach((link) => {
  link.href = whatsappUrl;
  if (business.whatsappHref) {
    link.target = "_blank";
    link.rel = "noopener";
  }
});

phoneTextLinks.forEach((link) => {
  link.textContent = business.phoneDisplay;
  link.href = business.phoneHref || "#contact";
});

emailLinks.forEach((link) => {
  link.textContent = business.emailDisplay;
  link.href = business.emailHref || "#contact";
});

// Set year once
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Call once on load
setHeaderState();

// Use passive listener for better scroll performance
window.addEventListener("scroll", setHeaderState, { passive: true });
