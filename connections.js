const grid = document.getElementById('grid');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const resultsContainer = document.getElementById('results');
let selected = [];
const groups = [
  {
    words: ['BREW', 'JAVA', 'MUD', 'ROCKET FUEL'],
    className: 'correct1' // 🟨 Slang for coffee
  },
  {
    words: ['BLAST', 'CRUD', 'CURSES', 'FUDGE'],
    className: 'correct2' // 🟩 'Aw, heck!'
  },
  {
    words: ['ACTION', 'LANGUAGE', 'NUDITY', 'SMOKING'],
    className: 'correct3' // 🟦 Considerations for movie ratings
  },
  {
    words: ['BURST', 'FATHER', 'POPULAR', 'SODA'],
    className: 'correct4' // 🟪 What 'pop' might mean
  }
];

function getGroupTitle(words) {
  if (words.includes('BREW') && words.includes('JAVA')) {
    return 'Slang for Coffee';
  }
  if (words.includes('BLAST') && words.includes('CRUD')) {
    return "'Aw, heck!'";
  }
  if (words.includes('ACTION') && words.includes('NUDITY')) {
    return 'Considerations for Movie Ratings';
  }
  if (words.includes('SODA') && words.includes('POP')) {
    return "What 'Pop' Might Mean";
  }
  return 'Unknown Group';
}

// Theme support
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.onclick = () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'default');
    };
  }
});

// Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Build the initial tile grid dynamically
let allWords = groups.flatMap(group => group.words);
shuffle(allWords);

function buildGrid(wordsArray) {
  grid.innerHTML = '';
  wordsArray.forEach(word => {
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.textContent = word;
    tile.addEventListener('click', () => {
      if (tile.classList.contains('revealed')) return;
      if (tile.classList.contains('selected')) {
        tile.classList.remove('selected');
        selected = selected.filter(t => t !== tile);
      } else {
        if (selected.length >= 4) return;
        tile.classList.add('selected');
        selected.push(tile);
      }
    });
    grid.appendChild(tile);
  });
  updateGridColumns();
}

// Adjust grid columns for tight fill
function updateGridColumns() {
  const remaining = grid.children.length;
  let cols = 4;
  if (remaining <= 8) cols = 4;
  if (remaining <= 4) cols = remaining;
  grid.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
}

// Initial grid display
buildGrid(allWords);

const solvedGroups = new Set();

submitBtn.addEventListener('click', () => {
  if (selected.length !== 4) {
    message.textContent = 'You must select exactly 4 tiles.';
    return;
  }
  const selectedWords = selected.map(tile => tile.textContent);
  const matchIndex = groups.findIndex(group =>
    group.words.length === selectedWords.length &&
    group.words.every(word => selectedWords.includes(word))
  );
  if (matchIndex !== -1 && !solvedGroups.has(matchIndex)) {
    const match = groups[matchIndex];
    // Visual feedback
    selected.forEach(tile => {
      tile.classList.remove('selected');
      tile.classList.add(match.className, 'revealed');
    });
    // Remove solved tiles after short delay, then tighten the grid
    setTimeout(() => {
      selected.forEach(tile => {
        if (grid.contains(tile)) {
          grid.removeChild(tile);
        }
      });
      updateGridColumns();
    }, 350);

    message.textContent = `✅ Group found!`;
    solvedGroups.add(matchIndex);

    // Show solved group in results panel
    const groupTitle = getGroupTitle(selectedWords);
    const resultBox = document.createElement('div');
    resultBox.className = `result-box ${match.className}`;
    const groupLabel = document.createElement('div');
    groupLabel.textContent = groupTitle;
    resultBox.appendChild(groupLabel);
    const wordList = document.createElement('div');
    wordList.className = 'result-words';
    selectedWords.forEach(word => {
      const span = document.createElement('div');
      span.className = `word ${match.className}`;
      span.textContent = word;
      wordList.appendChild(span);
    });
    resultBox.appendChild(wordList);
    resultsContainer.appendChild(resultBox);

    // Win message
    if (solvedGroups.size === groups.length) {
      message.textContent = '🎉 All groups found! You win!';
      submitBtn.disabled = true;
      submitBtn.classList.add('disabled');
    }
  } else {
    message.textContent = `❌ Not a correct group. Try again.`;
    selected.forEach(tile => tile.classList.remove('selected'));
  }
  selected = [];
});






