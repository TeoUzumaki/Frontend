document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  const prompt = document.getElementById("prompt");
  const imageInput = document.getElementById("imageInput");
  const responseBox = document.getElementById("response");

  sendBtn.addEventListener("click", async () => {
    const promptValue = prompt.value.trim();

    if (!promptValue && imageInput.files.length === 0) {
      responseBox.textContent = "⚠️ Please enter a message or upload an image.";
      return;
    }

    responseBox.textContent = "⌛ Loading...";

    const formData = new FormData();
    formData.append("message", promptValue);
    if (imageInput.files.length > 0) {
      formData.append("image", imageInput.files[0]);
    }

    try {
      const res = await fetch('https://gptbot-mohk.onrender.com/chat', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      responseBox.textContent = data.reply || "⚠️ No reply received.";
    } catch (err) {
      console.error(err);
      responseBox.textContent = "❌ Error contacting server.";
    }
  });
});



  
