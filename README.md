---
layout: default
title: "Password Generator"
description: "Small, client-side password generator built with HTML, CSS and vanilla JavaScript."
---

# Password Generator

A small, client-side password generator implemented with plain HTML, CSS and JavaScript. The app helps you create random passwords with configurable length and character sets and provides a convenient copy-to-clipboard action.

## Table of contents

- [Features](#features)
- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
- [Files](#files)
- [Development notes](#development-notes)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate random passwords
- Select password length (configurable min/max)
- Toggle inclusion of numbers and special characters
- Click any generated password to copy it to the clipboard
- Small, dependency-free codebase (Vanilla JS)

## Demo

Open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari). No build step or server required.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/mietus70/pwd-generator.git
cd pwd-generator
```

2. Open `index.html` in your browser or serve the folder via a static server (optional):

```bash
# using Python 3
python -m http.server 8000
# then open http://localhost:8000
```

## Usage

1. Use the length control to set the desired password length.
2. Toggle the "Symbols & numbers" switch to include or exclude digits and special characters.
3. Click the "Generate password" button to produce one or more passwords.
4. Click any generated password to copy it to your clipboard. A tooltip briefly confirms the copy action.

## Files

- `index.html` — Main HTML file containing the UI and element IDs/classes used by the script.
- `index.css` — Styling for the app, responsive layout and small UI effects.
- `index.js` — Main client-side logic: password generation, UI bindings and clipboard handling.
- `README.md` — Project documentation (this file).

## Development notes

- The generator uses a simple `Password` class (in `index.js`) that picks characters from an in-memory array. It uses `Math.random()` for randomness — sufficient for casual use, but not suitable for cryptographic purposes.
- `index.js` is written to be easy to read and modify; character sets are mutable and updated when toggling the symbols/numbers option.
- There are no dependencies or build tools required for development; edit files and refresh the browser.

## Contributing

Contributions are welcome. For small changes, open a pull request. For larger features, open an issue first to discuss the design.

## License

This project is provided under the MIT License. See the `LICENSE` file for details.
