const grid = document.getElementById('grid');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

let selected = [];
let tiles = [];

// ✅ Define new groups and their color classes with harder words
const groups = [
  {
    words: ['Effervescent', 'Resplendent', 'Opulent', 'Luminous'],
    className: 'correct1'
  },
  {
    words: ['Euphoria', 'Exhilaration', 'Rapture', 'Ecstasy'],
    className: 'correct2'
  },
  {
    words: ['Sibilant', 'Susurrous', 'Mellifluous', 'Euphonious'],
    className: 'correct3'
  },
  {
    words: ['Halcyon', 'Elysian', 'Utopian', 'Arcadian'],
    className: 'correct4'
  }
];

function getGroupTitle(words) {
  if (words.includes('Effervescent') && words.includes('Resplendent')) {
    return 'WORDS DESCRIBING RADIANT BEAUTY';
  }
  if (words.includes('Euphoria') && words.includes('Rapture')) {
    return 'WORDS FOR INTENSE HAPPINESS';
  }
  if (words.includes('Sibilant') && words.includes('Mellifluous')) {
    return 'TERMS FOR PLEASING SOUNDS';
  }
  if (words.includes('Halcyon') && words.includes('Utopian')) {
    return 'WORDS FOR IDEALISTIC NOTIONS';
  }
  return 'Unknown Group';
}

// ✅ Apply saved theme from localStorage
document.addEventListener("DOMContentLoaded", () => { 
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// ✅ Flatten all words into one array
let allWords = groups.flatMap(group => group.words);

// ✅ Shuffle using Fisher–Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(allWords);

// ✅ Build the tile grid dynamically
allWords.forEach(word => {
  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.textContent = word;
  grid.appendChild(tile);
  tiles.push(tile);

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
});

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

    selected.forEach(tile => {
      tile.classList.remove('selected');
      tile.classList.add(match.className, 'revealed');
      tile.style.display = 'none';
    });

    message.textContent = `✅ Group found!`;
    solvedGroups.add(matchIndex);

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
  } else {
    message.textContent = `❌ Not a correct group. Try again.`;
    selected.forEach(tile => tile.classList.remove('selected'));
  }

  selected = [];
});







