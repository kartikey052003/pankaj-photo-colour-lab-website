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
const navLinks = [...document.querySelectorAll(".nav-panel a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
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

navLinks.forEach((link) => {
  link.addEventListener("click", closeNav);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  },
  {
    rootMargin: "-30% 0px -55% 0px",
    threshold: [0.15, 0.35, 0.6]
  }
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll("[data-call-link]").forEach((link) => {
  link.setAttribute("href", business.phoneHref || "#contact");
});

document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
  const whatsappUrl = business.whatsappHref
    ? `${business.whatsappHref}?text=${encodeURIComponent(business.whatsappMessage)}`
    : "#contact";

  link.setAttribute("href", whatsappUrl);
  if (business.whatsappHref) {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
  } else {
    link.removeAttribute("target");
    link.removeAttribute("rel");
  }
});

document.querySelectorAll("[data-phone-text]").forEach((link) => {
  link.textContent = business.phoneDisplay;
  link.setAttribute("href", business.phoneHref || "#contact");
});

document.querySelectorAll("[data-email-link]").forEach((link) => {
  link.textContent = business.emailDisplay;
  link.setAttribute("href", business.emailHref || "#contact");
});

const yearEl = document.querySelector("[data-year]");
if (yearEl) yearEl.textContent = new Date().getFullYear();

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });
