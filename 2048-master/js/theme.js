document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme from localStorage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});