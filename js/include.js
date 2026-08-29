// Loads shared partials (nav, footer) into any element with data-include="path/to/file.html".
// Edit partials/nav.html or partials/footer.html once — every page picks up the change.
document.addEventListener("DOMContentLoaded", () => {
  const slots = document.querySelectorAll("[data-include]");

  Promise.all(
    Array.from(slots).map((slot) => {
      const path = slot.getAttribute("data-include");
      return fetch(path)
        .then((res) => res.text())
        .then((html) => { slot.outerHTML = html; })
        .catch(() => {
          slot.innerHTML = ""; // fail quietly if a partial can't load
        });
    })
  ).then(() => {
    // highlight the current page's nav link
    const current = document.body.getAttribute("data-page");
    if (!current) return;
    document.querySelectorAll(".nav-link").forEach((link) => {
      if (link.getAttribute("data-page") === current) {
        link.classList.add("active");
      }
    });
  });
});
