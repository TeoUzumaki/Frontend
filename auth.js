document.addEventListener("DOMContentLoaded", function () {
    // Check if the user has a valid JWT token
    const token = localStorage.getItem('token');

    // If no token is found, redirect to the login page
    if (!token && window.location.pathname !== '/index.html') {
        localStorage.setItem("intendedUrl", window.location.href); // Save current URL
        window.location.href = 'index.html'; // Redirect to login page
    }

    // If the token exists, provide the logout functionality
    const logoutLinks = document.querySelectorAll('.logout');
    logoutLinks.forEach(link => {
        link.addEventListener('click', function() {
            localStorage.removeItem("token");  // Clear the token
            window.location.href = "index.html"; // Redirect to login page
        });
    });
});

