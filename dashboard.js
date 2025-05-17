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

    // Pikachu button redirection
    const pikachuBtn = document.getElementById("pikachuBtn");
    if (pikachuBtn) {
        pikachuBtn.addEventListener("click", () => {
            window.location.href = "pika.html";
        });
    }

    // Game button redirection
    const gameBtn = document.getElementById("gameBtn");
    if (gameBtn) {
        gameBtn.addEventListener("click", () => {
            window.location.href = "connections.html";
        });
    }

    // Reddit button redirection
    const redditBtn = document.getElementById("redditBtn");
    if (redditBtn) {
        redditBtn.addEventListener("click", () => {
            window.location.href = "reddit.html";
        });
    }

    // Top-right dropdown toggle
    const dropdownToggle = document.getElementById("dropdownToggle");
    const dropdown = document.querySelector(".dropdown");

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("show");
        });

        document.addEventListener("click", () => {
            dropdown.classList.remove("show");
        });

        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    }

    // Sidebar dropdown toggle
    const sidebarDropdownToggle = document.getElementById("sidebarDropdownToggle");
    const sidebarDropdown = document.querySelector(".sidebar-dropdown");

    if (sidebarDropdownToggle && sidebarDropdown) {
        sidebarDropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebarDropdown.classList.toggle("show");
        });

        document.addEventListener("click", () => {
            sidebarDropdown.classList.remove("show");
        });

        sidebarDropdown.addEventListener("click", (e) => {
            e.stopPropagation(); // prevent inside clicks from closing it
        });
    }
});


