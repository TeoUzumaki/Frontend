// theme.js
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  // Optional: add a toggle button dynamically
  const container = document.querySelector('.container');
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Toggle Theme';
  toggleBtn.style.margin = '1rem 0 0 0';
  toggleBtn.style.width = 'auto';
  toggleBtn.style.padding = '8px 16px';
  toggleBtn.style.borderRadius = '8px';
  toggleBtn.style.border = 'none';
  toggleBtn.style.cursor = 'pointer';
  toggleBtn.style.fontWeight = 'bold';
  toggleBtn.style.fontSize = '1rem';

  container.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
});

function setTheme(theme) {
  document.body.classList.remove('light', 'dark');
  document.body.classList.add(theme);
}
