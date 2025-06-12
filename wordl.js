// ======== WORD LISTS (loaded from txt) ========
let WORD_LIST = [];
let VALID_WORDS = [];
// === CHOOSE YOUR DAILY ANSWER HERE! (must be 5-letter UPPERCASE and in the txt file) ===
let ANSWER = "WORDS
  ";; // <-- Change this for your daily answer!

let guesses = [];
let currentGuess = "";
let row = 0;
let done = false;
let keyStates = {};

async function loadWords() {
  const resp = await fetch('words5.txt');
  const text = await resp.text();
  // If your file contains carriage returns, \r, this will remove them
  WORD_LIST = text.split('\n').map(w=>w.replace(/\r/g,'').trim().toUpperCase()).filter(w=>w.length===5 && /^[A-Z]+$/.test(w));
  VALID_WORDS = WORD_LIST.slice(); // Use full list for guesses
  // If ANSWER is not in the list, pick at random and warn
  if (!WORD_LIST.includes(ANSWER)) {
    ANSWER = WORD_LIST[Math.floor(Math.random()*WORD_LIST.length)];
    alert("Specified ANSWER not found in words5.txt, picked random answer: " + ANSWER);
  }
  // After loading the wordlist, start the game
  initGame();
}

function initGame() {
  createBoard();
  createKeyboard();
  drawCurrentRow();
  document.getElementById("submit").onclick = () => handleKey("Enter");
  showFooterMsg("Enter a 5-letter word");
}

document.addEventListener('DOMContentLoaded', ()=>{
  // -- THEME
  if(localStorage.getItem("theme")==="dark") document.body.classList.add("dark");
  document.getElementById('theme-toggle').onclick = ()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('theme',document.body.classList.contains('dark') ? 'dark':'default');
  };
  // -- LOAD WORDS (and init game afterwards)
  loadWords();
});

// ======== BOARD =========
function createBoard() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  for (let i=0; i<6; ++i) {
    const r = document.createElement("div");
    r.className = "wordle-row";
    for (let j=0; j<5; ++j) {
      const c = document.createElement("div");
      c.className = "wordle-cell";
      c.textContent = "";
      r.appendChild(c);
    }
    grid.appendChild(r);
  }
}
function drawCurrentRow() {
  let grid = document.getElementById("grid");
  let rowDiv = grid.children[row];
  for (let i=0;i<5;++i){
    rowDiv.children[i].textContent = currentGuess[i]||"";
    rowDiv.children[i].className = "wordle-cell";
  }
}
// ======== KEYBOARD =========
function createKeyboard() {
  const kb = document.getElementById("keyboard");
  kb.innerHTML = "";
  const keysRow = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["ENT","Z","X","C","V","B","N","M","DEL"]
  ];
  for (let i=0; i<keysRow.length; ++i) {
    const r = document.createElement("div");
    r.className = "kb-row";
    keysRow[i].forEach(label=>{
      const k = document.createElement("button");
      k.className = "kb-key";
      k.textContent = label==="ENT"?"Enter":label==="DEL"?"←":label;
      k.onclick = ()=> {
        handleKey(
          label === "ENT" ? "Enter" :
          label === "DEL" ? "Backspace" : label
        );
      };
      r.appendChild(k);
    });
    kb.appendChild(r);
  }
}
function updateKeyboardColors() {
  document.querySelectorAll(".kb-key").forEach(k=>{
    let l = k.textContent.toUpperCase();
    if(l==="ENTER"||l==="←")return;
    const s = keyStates[l];
    if(s) {
      k.classList.remove("correct","present","absent");
      k.classList.add(s);
    }
  });
}
// ======== INPUT & FEEDBACK ==========
function handleKey(key) {
  if (done) return;
  if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
    currentGuess += key;
    drawCurrentRow();
  } else if ((key === "Backspace" || key === "Delete") && currentGuess.length > 0) {
    currentGuess = currentGuess.slice(0, -1);
    drawCurrentRow();
  } else if (key === "Enter") {
    if (currentGuess.length !== 5) {
      showFooterMsg("Need 5 letters.");
      return;
    }
    if (!VALID_WORDS.includes(currentGuess.toUpperCase())) {
      showFooterMsg("Not in word list.");
      return;
    }
    submitGuess();
  }
}
function getFeedback(guess, answer) {
  // Returns array: ['correct','present','absent',...]
  let fb = Array(5).fill("absent");
  let ansArr = answer.split('');
  let guessArr = guess.split('');
  let ansUsed = Array(5).fill(false);
  // Green pass
  for(let i=0;i<5;++i) {
    if(guessArr[i]===ansArr[i]) {
      fb[i]="correct";
      ansUsed[i]=true;
    }
  }
  // Yellow pass
  for(let i=0;i<5;++i) {
    if(fb[i]==="correct") continue;
    for(let j=0;j<5;++j) {
      if(!ansUsed[j] && guessArr[i]===ansArr[j]) {
        fb[i]="present";
        ansUsed[j]=true;
        break;
      }
    }
  }
  return fb;
}
function submitGuess() {
  let guess = currentGuess.toUpperCase();
  guesses.push(guess);
  let feedback = getFeedback(guess,ANSWER);
  const grid = document.getElementById("grid");
  const rowDiv = grid.children[row];
  for(let i=0;i<5;++i) {
    rowDiv.children[i].classList.add(feedback[i]);
    // Letter key coloring logic
    let l = guess[i];
    if(feedback[i]==="correct") keyStates[l]="correct";
    else if(feedback[i]==="present") keyStates[l]=keyStates[l]==="correct"?"correct":"present";
    else keyStates[l]=keyStates[l]||"absent";
  }
  updateKeyboardColors();
  if(guess === ANSWER) {
    showFooterMsg("🎉 Correct! You win!");
    document.getElementById("submit").disabled = true;
    done=true;
    return;
  }
  row++;
  currentGuess="";
  if(row>=6) {
    showFooterMsg(`❌ Out of guesses! The word was <span class="highlight">${ANSWER}</span>.`);
    done=true;
    document.getElementById("submit").disabled = true;
    return;
  }
  showFooterMsg(`Guess #${row+1} of 6`);
  drawCurrentRow();
}
function showFooterMsg(msg) {
  document.getElementById("message").innerHTML = msg;
}
// ===== PHYSICAL KEYBOARD SUPPORT =====
window.addEventListener("keydown", (e)=>{
  if(document.activeElement && document.activeElement.tagName==="INPUT") return;
  let k = e.key;
  if(/^[a-zA-Z]$/.test(k)) handleKey(k.toUpperCase());
  else if(k==="Enter") handleKey("Enter");
  else if(k==="Backspace"||k==="Delete") handleKey(k);
});
