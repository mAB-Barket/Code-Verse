# CodeVerse — Learn Any Programming Language

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Languages](https://img.shields.io/badge/Languages-8%2B-brightgreen)]()
[![Tutorials](https://img.shields.io/badge/Tutorials-50%2B-orange)]()
[![Status](https://img.shields.io/badge/Status-Active-success)]()

**CodeVerse** is a free, open-source, multi-language programming education platform built with pure HTML, CSS, and JavaScript. It features interactive tutorials, embedded video lessons, quizzes with instant feedback, progress tracking, dark mode, and a fully responsive design — all running entirely in the browser with zero dependencies.

🔗 **[Live Demo →](https://mab-barket.github.io/Aict-Project/)**

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 📚 **50+ Tutorials** | Step-by-step lessons covering fundamentals to intermediate topics across multiple languages |
| 🎥 **Video Lessons** | Embedded video tutorials on every lesson page for visual learners |
| ✏️ **Interactive Quizzes** | 200+ quiz questions with instant grading and score tracking |
| 📊 **Progress Tracking** | Scores saved locally in the browser — pick up where you left off |
| 🌙 **Dark Mode** | Beautiful light/dark theme toggle with persistent preference |
| 📱 **Fully Responsive** | Works perfectly on desktop, tablet, and mobile devices |
| 🔍 **Search** | Instantly filter languages and topics from the homepage |
| ⌨️ **Keyboard Shortcuts** | `Ctrl+K` to focus search, smooth anchor navigation |
| 📋 **Copy Code** | One-click copy button on all code blocks |
| 🖨️ **Print Friendly** | Clean print stylesheet for offline reference |

---

## 🗂️ Supported Languages

| Language | Status | Lessons | Topics |
|----------|--------|---------|--------|
| **C++** | ✅ Complete | 7 | Introduction, Variables, Comments, Arrays, Functions, Loops, If/Else |
| **Python** | ✅ Complete | 8 | Introduction, Variables, Strings, Lists & Dicts, Conditionals, Loops, Functions, OOP |
| **JavaScript** | ✅ Complete | 8 | Introduction, Variables, Strings, Arrays, Conditionals, Loops, Functions, DOM |
| **Java** | ✅ Complete | 8 | Introduction, Variables, Strings, Arrays, Conditionals, Loops, Methods, OOP |
| **C#** | 🚧 Coming Soon | — | Introduction, Variables, Strings, Arrays, Conditionals, Loops, Methods, OOP, LINQ, Unity |
| **Web Dev** | 🚧 Coming Soon | — | HTML Basics, Forms, CSS Fundamentals, Box Model, Flexbox, Grid, Responsive, Animations |
| **Rust** | 🚧 Coming Soon | — | Introduction, Variables, Data Types, Ownership, Borrowing, Structs, Enums, Error Handling |
| **Go** | 🚧 Coming Soon | — | Introduction, Variables, Functions, Control Flow, Slices, Maps, Goroutines, Channels |

---

## 📁 Project Structure

```
CodeVerse/
├── index.html              # Homepage — language cards, features, roadmap, comparison
├── about.html              # About page — mission, timeline, values, tech stack, team
├── resources.html          # Resources — docs, IDEs, practice platforms, YouTube, books, paths
├── README.md
│
├── assets/                 # Static assets (CSS, JS, images)
│   ├── css/
│   │   └── style.css       # 1300+ line design system (indigo/emerald theme, dark mode)
│   ├── js/
│   │   └── script.js       # Feature engine (quiz, theme, animations, search, progress)
│   └── images/
│       └── favicon.svg     # SVG favicon (indigo gradient code brackets)
│
├── cpp/                    # C++ Course (7 lessons)
│   ├── index.html
│   ├── introduction.html
│   ├── variables.html
│   ├── comments.html
│   ├── arrays.html
│   ├── functions.html
│   ├── loops.html
│   └── ifelse.html
│
├── python/                 # Python Course (8 lessons)
│   ├── index.html
│   ├── introduction.html
│   ├── variables.html
│   ├── strings.html
│   ├── lists.html
│   ├── conditionals.html
│   ├── loops.html
│   ├── functions.html
│   └── oop.html
│
├── javascript/             # JavaScript Course (8 lessons)
│   ├── index.html
│   ├── introduction.html
│   ├── variables.html
│   ├── strings.html
│   ├── arrays.html
│   ├── conditionals.html
│   ├── loops.html
│   ├── functions.html
│   └── dom.html
│
├── java/                   # Java Course (8 lessons)
│   ├── index.html
│   ├── introduction.html
│   ├── variables.html
│   ├── strings.html
│   ├── arrays.html
│   ├── conditionals.html
│   ├── loops.html
│   ├── methods.html
│   └── oop.html
│
├── csharp/                 # C# (Coming Soon)
│   └── index.html
├── webdev/                 # Web Development (Coming Soon)
│   └── index.html
├── rust/                   # Rust (Coming Soon)
│   └── index.html
└── go/                     # Go (Coming Soon)
    └── index.html
```

---

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mAB-Barket/Aict-Project.git
   ```

2. **Open in browser:**
   ```bash
   cd Aict-Project
   open index.html
   ```
   Or simply double-click `index.html` — no server, no build tools, no dependencies required.

3. **Optional — Live Server:**
   If you're using VS Code, install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) and click "Go Live" for auto-refresh during development.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic page structure and content |
| **CSS3** | Professional design system with custom properties, responsive grid, dark mode |
| **Vanilla JavaScript** | Quiz engine, theme toggle, animations, search, progress tracking |
| **Google Fonts** | Inter, Poppins, and Fira Code typefaces |
| **GitHub Pages** | Free static hosting |

No frameworks. No build tools. No dependencies. Pure web technologies.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Add tutorials** — Write new lessons for existing or upcoming languages
2. **Fix typos** — Spot an error? Submit a quick PR
3. **Add video links** — Replace `about:blank` iframe sources with relevant YouTube tutorial URLs
4. **Improve design** — Suggest or implement UI/UX improvements
5. **New languages** — Help build out C#, Web Dev, Rust, or Go sections

```bash
# Fork and clone
git clone https://github.com/YOUR-USERNAME/Aict-Project.git

# Create a feature branch
git checkout -b feature/new-tutorial

# Make changes and commit
git add .
git commit -m "Add Python decorators tutorial"

# Push and create PR
git push origin feature/new-tutorial
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built as an academic project with the vision of making programming education accessible to everyone
- Inspired by platforms like W3Schools, MDN Web Docs, and freeCodeCamp
- Special thanks to all contributors and learners who use CodeVerse

---

<p align="center">
  Made by <a href="https://github.com/mAB-Barket">CodeVerse Team</a>
</p>

