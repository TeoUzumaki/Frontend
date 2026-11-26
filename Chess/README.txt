NEXT BEST CHESS MOVE — WEBSITE VERSION

WHAT THIS VERSION DOES
- Runs the chessboard and analysis interface in the browser.
- Runs Stockfish 19 lite single-threaded as a Web Worker.
- Does not need the Windows .bat file, PowerShell, or a local PC server.
- Keeps the original board controls, move history, FEN/PGN loading, candidate lines and best-move display.

HOW TO ADD IT TO YOUR WEBSITE
1. Extract this ZIP.
2. Upload the contents of this folder to a folder on your website, for example /chess/.
3. Make sure the uploaded structure stays exactly like this:
      /chess/index.html
      /chess/chess.min.js
      /chess/engine/stockfish-loader.js
4. Open https://your-domain.example/chess/ .

ENGINE FILES
The loader fetches the pinned Stockfish 19.0.1 lite single-threaded JavaScript and matching WebAssembly file from jsDelivr when the engine starts. Your site must allow access to https://cdn.jsdelivr.net and must serve this page over HTTPS (or localhost for testing). A first visit needs an internet connection to fetch the engine; browsers may cache it afterwards.

HOSTING
This is a static site: it can be hosted in a normal website folder, GitHub Pages, Netlify, or most static hosting services. No Node.js backend or terminal process is needed.

NOTES
- The lite single-threaded build is deliberately selected because it works without special cross-origin isolation headers.
- The analysis depth control remains available. Higher depths take longer and use more device resources.
- The engine analyses positions entered into this page; it does not automatically read or interact with Chess.com.

THIRD-PARTY LICENCES
Stockfish.js is distributed under GNU GPL v3. Project/source: https://github.com/nmrugg/stockfish.js
Stockfish upstream: https://github.com/official-stockfish/Stockfish
The chess.js library is distributed under the BSD 2-Clause licence. Project: https://github.com/jhlywa/chess.js
The Stockfish engine files are fetched unmodified from stockfish@19.0.1 on jsDelivr.
