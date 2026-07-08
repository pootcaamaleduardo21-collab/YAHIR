const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const storedContent = JSON.parse(localStorage.getItem("yahirSiteContent") || "{}");
const siteContent = { ...(window.YAHIR_SITE_CONTENT || {}), ...storedContent };

document.querySelectorAll("[data-content]").forEach((element) => {
  const key = element.dataset.content;
  if (siteContent[key]) element.textContent = siteContent[key];
});

document.querySelectorAll("[data-content-image]").forEach((element) => {
  const key = element.dataset.contentImage;
  if (siteContent[key]) element.setAttribute("src", siteContent[key]);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
