document.addEventListener("DOMContentLoaded", () => {
  // Apply saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});
