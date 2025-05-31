const games = [
    { title: "Connections", url: "connections.html" }
];

// === THEME MANAGEMENT ===
function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    document.getElementById('themeSelect').value = theme;
}

function getStoredTheme() {
    return localStorage.getItem("theme") || "default";
}

document.addEventListener("DOMContentLoaded", () => {
    // Inject games
    const gameList = document.getElementById("gameList");
    gameList.innerHTML = games.map(game => `
        <li class="game-card">
            <span class="game-title">${game.title}</span>
            <a href="${game.url}" class="game-link">Play</a>
        </li>
    `).join("");

    // Theme setup
    setTheme(getStoredTheme());
    document.getElementById("themeSelect").addEventListener("change", e => {
        setTheme(e.target.value);
    });

    // Settings dropdown
    const settingsBtn = document.getElementById("settingsBtn");
    const menu = document.getElementById("settingsMenu");
    settingsBtn.addEventListener("click", e => {
        e.stopPropagation();
        menu.classList.toggle("open");
    });
    // Close on clicking elsewhere
    document.addEventListener("click", () => {
        menu.classList.remove("open");
    });
    // Prevent closing when interacting inside the menu
    menu.addEventListener("click", e => e.stopPropagation());
});