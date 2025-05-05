Hosted Link - https://travel-story-eosin.vercel.app/
📌 Overview
TravelStory is a creative travel journal web app built using React (Vite). It lets users create a draggable canvas where they can add images and text, animate the creation process, and export their story as a PDF or a video.
🧰 Tech Stack
React (Vite)

1. anime.js – For smooth animations

2. Remotion – To export the canvas as a video

3. @remotion/player – Embed and control Remotion videos in the app

4. html2canvas – To capture the canvas as an image

5. jsPDF – To export the canvas content as a PDF

⚙️ Prerequisites
Node.js (v16 or higher recommended)

📦 Installation
1. Clone the Repository
   git clone https://github.com/Mk-debugger11/TravelStory.git
   cd TravelStory
2. npm install
3. npm install animejs
4. npm install remotion
5. npm install @remotion/player
6. npm install html2canvas
7. npm install jspdf

▶️ Run the App
Start the development server:
  npm run dev
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
