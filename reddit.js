document.addEventListener('DOMContentLoaded', () => {
  // ----- Theme handling -----
  const themeToggle = document.getElementById('theme-toggle'); // Optional: add to HTML if desired
  const savedTheme = localStorage.getItem('theme') || 'default';
  setTheme(savedTheme);

  function setTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.body.classList.contains('dark') ? 'dark' : 'default';
      setTheme(currentTheme === 'dark' ? 'default' : 'dark');
    });
  }

  // ----- App logic -----
  const form = document.getElementById('link-form');
  const input = document.getElementById('reddit-url');
  const list = document.getElementById('link-list');
  const token = localStorage.getItem('token');
  const API_URL = 'https://my-node-backend-7qyb.onrender.com';

  if (!token) {
    alert('You must be logged in to see and add links.');
    // window.location.href = "login.html"; // Uncomment if you want to redirect
    return;
  }

  loadLinks();

  function loadLinks() {
    fetch(`${API_URL}/links`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch links');
        return res.json();
      })
      .then(links => {
        list.innerHTML = '';
        if (Array.isArray(links)) {
          // Handle array of strings or array of objects
          links.forEach(link => {
            if (typeof link === "string") addLink(link);
            else if (link && typeof link.url === "string") addLink(link.url);
          });
        }
      })
      .catch(err => {
        console.error('Error fetching links:', err);
        alert('Failed to load links, please try again.');
      });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = input.value.trim();
    if (!url) return;
    fetch(`${API_URL}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ url })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save link');
        // For string responses or empty object, use the input url
        addLink(url);
        input.value = '';
      })
      .catch(err => {
        alert('Failed to save link');
        console.error('Error:', err);
      });
  });

  function addLink(url) {
    // Avoid duplicates
    const normUrl = url.replace(/\/+$/, '');
    if ([...list.children].some(li => li.querySelector('a').href.replace(/\/+$/, '') === normUrl)) return;
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    a.textContent = url;
    a.target = '_blank';
    a.rel = "noopener noreferrer";
    const btn = document.createElement('button');
    btn.textContent = '🗑️';
    btn.className = 'delete-btn';
    btn.setAttribute('aria-label', 'Delete link');
    li.appendChild(a);
    li.appendChild(btn);
    list.appendChild(li);
  }

  // Efficient delete: one handler for the whole list
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const li = e.target.closest('li');
      const url = li.querySelector('a').href;
      deleteLink(url, li);
    }
  });

  function deleteLink(url, element) {
    fetch(`${API_URL}/links`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ url })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete link');
        element.remove();
      })
      .catch(err => {
        alert('Error deleting link');
        console.error('Error:', err);
      });
  }
});