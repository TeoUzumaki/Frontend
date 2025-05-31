document.addEventListener("DOMContentLoaded", () => {
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.addEventListener("click", () => {
    const responseBox = document.getElementById('response');
    console.log("Send button clicked");
    responseBox.textContent = "Button clicked!";
  });
});


  
