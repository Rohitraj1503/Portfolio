# 🌌 Rohit Raj • Cyberpunk Developer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-API_Uplink-EA4335?style=for-the-badge&logo=google-gemini&logoColor=white)](https://deepmind.google/technologies/gemini/)

Welcome to the command console of **Rohit Raj**, a B.Tech Computer Science Engineering student at SRM Institute of Science and Technology. This portfolio is engineered to blend high-fidelity modern UI aesthetics with real-time interactive systems, telemetry dashboards, and intelligent features.

🔗 Live Workspace Telemetry: **[http://localhost:3000](http://localhost:3000)**

---

## 🛠️ Cyber-Engineering Features

### 🧠 Jarvis AI Assistant (Google Gemini Grounding)
An interactive conversational bot modeled after the iconic Jarvis assistant.
* **Uplink Mainframe**: Connects server-side to the Gemini model (`gemini-2.5-flash`) via an API Route Handler to ensure API key safety.
* **Google Search Grounding**: Enabled web search tools so Jarvis can answer both Rohit-related portfolio queries and arbitrary real-time internet questions.
* **Futuristic Feedback**: Includes audio beeps, dynamic loading indicators, and a sophisticated British terminal persona.

### 🐍 Snake Game Tech Stack Matrix
An interactive, fluidly moving tech stack logo system.
* **Snake Physics**: Instead of static grids, logos slither continuously left-to-right along an S-curve, closely linked together to form a snake body.
* **Visual Tapering**: Logo bubbles scale down progressively from the glowing led head segment (100% scale) down to the tail (72% scale).
* **Sound Interaction**: Clicking on any tech logo plays diagnostic audio tones.

### 📡 Communication Center (Email Transmission)
A functional terminal-themed email gateway for sending messages to `rohitraj.codes@gmail.com`.
* **AJAX Mail Uplink**: Dispatches submissions client-side via FormSubmit.co, preventing client-side SMTP credential leaks.
* **Live Telemetry logs**: Displays simulated socket connection, encryption, and gateway confirmation sequences directly to the terminal panel.
* **Victory State**: Spawns an orange-themed confetti shower and form reset upon successful dispatch.

### 🎮 Easter Egg: Konami God Mode
* **Cheat Sequence**: Entering the legendary Konami code (`↑ ↑ ↓ ↓ ← → ← → B A`) triggers a visual system glitch sequence, transitioning the portfolio into a custom holographic red **God Mode** style override.

---

## 💻 Tech Stack Portfolio

```
⚡ LANGUAGES:   C++ (DSA Core), Python, JavaScript, TypeScript
⚡ BACKEND:     FastAPI, Node.js, Express.js, Spring Boot, Supabase, MySQL, Postgres
⚡ FRONTEND:    React, Tailwind CSS, Next.js, Framer Motion, Three.js
⚡ LIBRARIES:   canvas-confetti, Lucide React
```

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js and npm installed.

### 2. Environment Configurations
Create a `.env.local` file in the root directory and add your Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Installation
Install the project dependencies:
```bash
npm install
```

### 4. Initiate Telemetry (Local Dev Server)
Run the development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** to view the console.

### 5. Build for Production
To build the optimized Next.js bundle:
```bash
npm run build
```

---

## 📁 System Architecture
```
Portfolio/
├── src/
│   ├── app/
│   │   ├── api/chat/route.ts       # Gemini API route & System Prompt
│   │   ├── layout.tsx              # Base structure & typography
│   │   └── page.tsx                # Layout orchestrator
│   └── components/
│       ├── ChatAssistant.tsx       # Jarvis AI widget interface
│       ├── ContactForm.tsx         # Telemetry logs & email gateway
│       ├── TechStackLogos.tsx      # Snake Game logo matrix
│       ├── CyberBackground.tsx     # 3D canvas backdrop
│       └── ... (other panels)
├── .env.local                      # Local API configurations
└── README.md                       # Systems documentation
```

---
© Rohit Raj. All Rights Reserved. Engineered with precision.
