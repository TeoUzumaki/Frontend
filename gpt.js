document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle support (if used elsewhere)
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }

  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
    });
  }
});

// Handle send message + image
async function sendMessage() {
  const prompt = document.getElementById('prompt').value;
  const imageInput = document.getElementById('imageInput');
  const responseBox = document.getElementById('response');
  const preview = document.getElementById('preview');
  responseBox.textContent = "⌛ Loading...";

  let imageBase64 = null;

  if (imageInput.files.length > 0) {
    const file = imageInput.files[0];
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      responseBox.textContent = "⚠️ Unsupported image format.";
      return;
    }

    imageBase64 = await toBase64(file);
    preview.src = imageBase64;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }

  const res = await fetch('https://gptbot-mohk.onrender.com/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: prompt, image: imageBase64 }),
  });

  const data = await res.json();
  responseBox.textContent = data.reply || "⚠️ Something went wrong.";
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
  