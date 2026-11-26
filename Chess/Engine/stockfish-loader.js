/* Stockfish 19.0.1 lite single-threaded browser worker loader.
   Stockfish.js is served unmodified from the pinned npm release.
   Its matching WASM file is resolved from the same release directory. */
const STOCKFISH_BASE = 'https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/';
self.Module = self.Module || {};
self.Module.locateFile = function (path) {
  return STOCKFISH_BASE + path;
};
importScripts(STOCKFISH_BASE + 'stockfish-19-lite-single.js');
