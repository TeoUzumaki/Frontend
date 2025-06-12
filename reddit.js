document.addEventListener('DOMContentLoaded', () => {
  // ----- Theme handling -----
  // Optional theme toggle if you add a button with id 'theme-toggle'
  /*
  const themeToggle = document.getElementById('theme-toggle');
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
  */

  // ----- URL Normalization helper -----
  function normalizeUrl(url) {
    let normalized = url.trim();

    if (/^www\./i.test(normalized)) {
      normalized = 'http://' + normalized;
    } else if (!/^https?:\/\//i.test(normalized)) {
      normalized = 'http://' + normalized;
    }

    normalized = normalized.replace(/\/+$/, ''); // Remove trailing slashes
    // lowercase domain only (optional)
    // For simplicity, lowercase entire url here:
    normalized = normalized.toLowerCase();

    return normalized;
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

    const normalizedUrl = normalizeUrl(url);

    fetch(`${API_URL}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ url: normalizedUrl })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save link');
        addLink(normalizedUrl);
        input.value = '';
      })
      .catch(err => {
        alert('Failed to save link');
        console.error('Error:', err);
      });
  });

  function addLink(url) {
    const normUrl = normalizeUrl(url);
    // Prevent duplicates
    if ([...list.children].some(li => normalizeUrl(li.querySelector('a').href) === normUrl)) return;

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

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const li = e.target.closest('li');
      const url = normalizeUrl(li.querySelector('a').href);
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

