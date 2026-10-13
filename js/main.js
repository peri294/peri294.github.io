const root = document.documentElement;

// Año del footer
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Idioma =====
const meta = {
  es: {
    title: "Nicolás Guzzo Punta — Full Stack Developer",
    description: "Portfolio de Nicolás Guzzo Punta, desarrollador full stack trainee. Proyectos con React, Node.js y Next.js/TypeScript.",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
  },
  en: {
    title: "Nicolás Guzzo Punta — Full Stack Developer",
    description: "Portfolio of Nicolás Guzzo Punta, trainee full-stack developer. Projects built with React, Node.js and Next.js/TypeScript.",
    menuOpen: "Open menu",
    menuClose: "Close menu",
  },
};

const copyBtns = document.querySelectorAll("[data-copy]");

function setLang(lang) {
  root.lang = lang;
  try { localStorage.setItem("lang", lang); } catch {}
  document.title = meta[lang].title;
  document.querySelector('meta[name="description"]').content = meta[lang].description;
  copyBtns.forEach((btn) => (btn.textContent = btn.dataset[lang]));
  updateMenuLabel();
}

document.querySelector(".lang-toggle").addEventListener("click", () => {
  setLang(root.lang === "es" ? "en" : "es");
});

// ===== Menú móvil =====
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

function updateMenuLabel() {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-label", open ? meta[root.lang].menuClose : meta[root.lang].menuOpen);
}

function setMenu(open) {
  toggle.setAttribute("aria-expanded", String(open));
  links.classList.toggle("open", open);
  updateMenuLabel();
}

toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
links.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

setLang(root.lang === "en" ? "en" : "es");

// ===== Borde del header al hacer scroll =====
const header = document.querySelector(".site-header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Aparición suave de secciones =====
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((el) => revealObserver.observe(el));

  // ===== Resaltar la sección actual en el menú =====
  const navAnchors = [...links.querySelectorAll("a")];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navAnchors.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`)
        );
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navAnchors.forEach((a) => {
    const section = document.querySelector(a.getAttribute("href"));
    if (section) sectionObserver.observe(section);
  });
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

// ===== Copiar email =====
copyBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const lang = root.lang;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = btn.dataset[`${lang}Done`];
    } catch {
      btn.textContent = btn.dataset[`${lang}Fail`];
    }
    setTimeout(() => (btn.textContent = btn.dataset[root.lang]), 1800);
  });
});
