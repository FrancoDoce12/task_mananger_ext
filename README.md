## Task Manager Extension
# A Chrome Extension for Managing Tasks with Notifications and an Interactive Editor

This project is a productivity-focused Chrome extension designed to help you manage your tasks and stay reminded of them.  
It helps you stay focused on the things that matter, while providing a clear **Tree/Node-based UI** built with **React** and **React Flow** for better task visualization and management.  

## ✨ Features
- 📌 Create and manage tasks with a complex tree of sub-tasks.  
- ⏰ Helpful, non-intrusive notifications as reminders.  
- 🖼️ Clear, Node-based UI for managing even complex task structures.  

## How to Use (After Installation)
1. **Click the extension icon** in your Chrome toolbar to open the action popup.  
2. **Click "Open Editor"** to launch the full task management interface.  
   Your task data will be saved locally in Chrome extension storage.  

# 🚀 Getting Started (For Developers)

## Installation and Usage (For End Users)
1. Download or clone this repository.  
2. Install dependencies: `npm install`  
3. Build the extension: `npm run build`  
4. Open Chrome and navigate to `chrome://extensions/`  
5. Enable "**Developer mode**"  
6. Click "**Load unpacked**" and select the `build` folder from this project.  
7. The extension will now be available in your Chrome toolbar.  

## Development Setup (For Contributors)
1. Fork and clone the repository.  
2. Install dependencies: `npm install`  
3. Start development server: `npm run dev`  
4. The Webpack dev server will start on port 3000.  
5. Extension files will be built into the `build` folder.  
6. Load the `build` folder as an unpacked extension in Chrome (as described above).  
7. Make changes in the `src` directory.  
8. Changes will automatically rebuild when using `npm run dev`.  
9. Submit a pull request with your improvements.  

---

## Screenshots


## Known Issues
- ❌ No mobile support.  
- 📐 The node's default positions are a bit odd due to the node’s imprecise size measurements 

---

### ☕ Support Me
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-FCC624?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://www.buymeacoffee.com/FrancoDoce12)