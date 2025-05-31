document.addEventListener("DOMContentLoaded", () => {
    // Apply saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    // Theme toggle button (if exists in settings page)
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark");
            localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
        });
    }
});    