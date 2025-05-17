document.addEventListener("DOMContentLoaded", () => {
    // Apply saved theme from localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
    }

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const content = button.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });
});

