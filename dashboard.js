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

    // Game button redirection
    const gameBtn = document.getElementById("gameBtn");
    if (gameBtn) {
        gameBtn.addEventListener("click", () => {
            window.location.href = "games.html";
        });
    }

    // Reddit button redirection
    const redditBtn = document.getElementById("redditBtn");
    if (redditBtn) {
        redditBtn.addEventListener("click", () => {
            window.location.href = "reddit.html";
        });
    }

    // Chatbot button redirection
    const chatbotBtn = document.getElementById("chatbotBtn");
    if (chatbotBtn) {
        chatbotBtn.addEventListener("click", () => {
            window.location.href = "gpt.html";
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

        document.addEventListener("click", (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("show");
            }
        });

        dropdown.addEventListener("click", (e) => e.stopPropagation());
    }

    // Sidebar dropdown toggle
    const sidebarDropdownToggle = document.getElementById("sidebarDropdownToggle");
    const sidebarDropdown = document.querySelector(".sidebar-dropdown");
    if (sidebarDropdownToggle && sidebarDropdown) {
        sidebarDropdownToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            sidebarDropdown.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!sidebarDropdown.contains(e.target)) {
                sidebarDropdown.classList.remove("show");
            }
        });

        sidebarDropdown.addEventListener("click", (e) => e.stopPropagation());
    }

    // === Flight countdown + Last Update auto-fill ===
    const flightDate = new Date("2026-06-30"); // <-- set your flight date here (YYYY-MM-DD)
    const today = new Date();

    const flightEdtElement = document.getElementById("flightEdt");
    const lastUpdateElement = document.getElementById("lastUpdate");

    if (flightEdtElement) {
        const diffTime = flightDate - today;
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        const flightDay = String(flightDate.getDate()).padStart(2, "0");
        const flightMonth = String(flightDate.getMonth() + 1).padStart(2, "0");
        const flightYear = flightDate.getFullYear();

        flightEdtElement.textContent = daysLeft > 0
            ? `${flightDay}/${flightMonth}/${flightYear} — ${daysLeft} days until flight`
            : "Flight day!";
    }

    if (lastUpdateElement) {
        const day = String(today.getDate()).padStart(2, "0");
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const year = today.getFullYear();
        lastUpdateElement.textContent = `${day}/${month}/${year}`;
    }
});









