document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  // Accordion drop animation
  document.querySelectorAll('.section').forEach(section => {
    const btn = section.querySelector('.toggle-btn');
    const content = section.querySelector('.content');
    btn.addEventListener('click', () => {
      const isOpen = section.classList.toggle('open');
      if (isOpen) {
        // Animate open with actual scrollHeight
        content.style.maxHeight = content.scrollHeight + "px";
      } else {
        content.style.maxHeight = null;
      }
      // on open, collapse the other sections
      document.querySelectorAll('.section').forEach(other => {
        if (other !== section) {
          other.classList.remove('open');
          other.querySelector('.content').style.maxHeight = null;
        }
      });
    });
  });
});

