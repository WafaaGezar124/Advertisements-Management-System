# DEPI Graduation Project - Front-end (Phase 01)

## What is included
This zip contains a complete front-end implementation (static) for the dashboard UI.
The project is responsive and includes sample charts using Chart.js.

### Structure
```
depi_graduation_frontend/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── components/
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

## How to run locally
1. Unzip the archive.
2. Open `index.html` in your browser (double-click) or serve it with a simple static server.
   - Using VS Code Live Server extension — right click `index.html` -> Open with Live Server.
   - Or run `npx serve` or `python -m http.server` in the project folder.

## Notes for grading / improvement suggestions
- All UI parts are implemented as static HTML/CSS. You can replace dummy data with real API responses.
- Charts use Chart.js CDN in the HTML file (no build step required).
- The project has clear folders for components, styles, scripts, and assets for easy extension.
- Naming conventions and comments are included in CSS and JS for readability.
