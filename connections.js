const grid = document.getElementById('grid');
const message = document.getElementById('message');
const submitBtn = document.getElementById('submit');
const resultsContainer = document.getElementById('results');

let selected = [];
let tiles = [];

// Define new groups and their color classes
const groups = [
  {
    words: ['Pluto', 'Mars', 'Earth', 'Venus'],
    className: 'correct1'
  },
  {
    words: ['Lion', 'Tiger', 'Leopard', 'Cheetah'],
    className: 'correct2'
  },
  {
    words: ['Oxygen', 'Helium', 'Carbon', 'Nitrogen'],
    className: 'correct3'
  },
  {
    words: ['Shakespeare', 'Hemingway', 'Dickens', 'Austen'],
    className: 'correct4'
  }
];

// Helper function to determine the title of the group based on its words
function getGroupTitle(words) {
  if (words.includes('Pluto') || words.includes('Mars') || words.includes('Earth') || words.includes('Venus')) {
    return 'Planets in Our Solar System';
  }
  if (words.includes('Lion') || words.includes('Tiger') || words.includes('Leopard') || words.includes('Cheetah')) {
    return 'Big Cats';
  }
  if (words.includes('Oxygen') || words.includes('Helium') || words.includes('Carbon') || words.includes('Nitrogen')) {
    return 'Chemical Elements';
  }
  if (words.includes('Shakespeare') || words.includes('Hemingway') || words.includes('Dickens') || words.includes('Austen')) {
    return 'Famous Authors';
  }
  return 'Unknown Group';
}

// Apply saved theme from localStorage
document.addEventListener("DOMContentLoaded", () => { 
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// Flatten all words into one array
let allWords = groups.flatMap(group => group.words);

// Shuffle using Fisher–Yates algorithm
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffle(allWords);

// Build the tile grid dynamically
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
      
      // Remove the tile from the grid
      tile.style.display = 'none'; // This hides the tile from the grid
    });

    message.textContent = `✅ Group found!`;
    solvedGroups.add(matchIndex);

    // Get the group title using the helper function
    const groupTitle = getGroupTitle(selectedWords);

    // Display result box
    const resultBox = document.createElement('div');
    resultBox.className = `result-box ${match.className}`;

    // Title for the result box (group name)
    const groupLabel = document.createElement('div');
    groupLabel.textContent = groupTitle; // Use the dynamic group title
    resultBox.appendChild(groupLabel);

    // Create list of selected words
    const wordList = document.createElement('div');
    wordList.className = 'result-words';

    // Add each selected word with the correct color class (based on group)
    selectedWords.forEach(word => {
      const span = document.createElement('div');
      span.className = `word ${match.className}`; // Add both 'word' and group class (e.g., 'correct1')
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







