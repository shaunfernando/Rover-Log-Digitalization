# Rover E-Logbook — Wireframes

This folder contains interactive wireframes for the Rover E-Logbook project. The wireframes demonstrate two design directions (Direction A and Direction B) and allow you to toggle themes and layout tweaks directly in the browser.

## Files

| File | Description |
|------|-------------|
| `Rover E-Logbook.html` | Entry point — open this in a live server to view the wireframes |
| `data.jsx` | Sample logbook data used to populate the UI |
| `theme.jsx` | Colour palette and typography tokens |
| `design-canvas.jsx` | Shared canvas/layout wrapper used by both directions |
| `tweaks-panel.jsx` | Interactive panel for toggling visual options |
| `direction-a.jsx` | Design Direction A screens |
| `direction-b.jsx` | Design Direction B screens |

## Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- The **Live Server** extension for VS Code (by Ritwick Dey)

## Installation

1. **Download the files** — copy all files from this folder (`Rover E-Logbook.html` and all `.jsx` files) into a single local directory.

2. **Open VS Code** — open that directory in VS Code (`File > Open Folder…`).

3. **Install Live Server** — if you haven't already:
   - Open the Extensions panel (`Ctrl+Shift+X` / `Cmd+Shift+X`)
   - Search for **Live Server**
   - Click **Install**

## Running the Wireframes

1. In the VS Code Explorer, select `Rover E-Logbook.html`.
2. Right-click the file and choose **Open with Live Server**, or click **Go Live** in the VS Code status bar.
3. Your default browser will open a tab at `http://localhost:5500` (port may vary).

## Notes

- An internet connection is required on first load — the HTML file fetches React, ReactDOM, and Babel from a CDN.
- The `.jsx` files are transpiled in the browser by Babel; no build step is needed.
- These wireframes are for design review only and do not represent the final implementation.
- All changes are visual only — no data is saved.
