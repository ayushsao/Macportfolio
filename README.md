# 🌸 macOS Desktop Style Interactive Portfolio

An immersive, premium macOS-desktop-style interactive portfolio website for **Ayush Kumar Sao, Full Stack MERN Developer**. This repository is built as a complete full-stack environment using a modern high-performance stack:

*   **Frontend (/client):** Vite + React + TypeScript + Tailwind CSS v4 + Zustand + Framer Motion + React Three Fiber (R3F)
*   **Backend (/server):** Node.js + Express + TypeScript + MongoDB + Mongoose
*   **3D Scene:** An orthographic React Three Fiber canvas creating an ambient instanced particle field (drifting blossom petals and pollen) behind the desktop.

---

## 📸 Core Visual & Interaction Design

1.  **Gradient Mesh Wallpaper:** Dynamic CSS-only watercolor gradient mesh blending cream, blossom pink, sage green, and sky blue. No heavy image asset dependencies.
2.  **macOS Top Menu Bar:** Features a live updating short clock (e.g. `Tue Jul 21 5:46 PM`) on the right, and access shortcut triggers to windows on the left.
3.  **Desktop Icon Grid:** Shortcuts for *About Me*, *Projects*, *Experience*, *Resume.pdf*, and *Contact* stacked vertically on the left. Includes single-click focus outlines and double-click triggers to open task windows.
4.  **Premium Draggable Windowing:** Powered by Framer Motion. Windows are draggable via their titlebars, support active z-index focus stacking, traffic-light controllers (close, minimize, maximize), double-click to maximize, and smooth spring pop animations.
5.  **Interactive App Dock:** Centered floating pill with cursor-proximity magnification (fisheye scaling) calculated using `useMotionValue` and springs. Includes active application indicators.
6.  **Ambient 3D Layer:** Lazy-loaded 3D cherry blossom instance mesh drifting in a subtle simulated wind behind desktop windows for premium visual depth.

---

## 📂 Project Structure

```text
NEW portfolio/
├── client/                     # Vite React TS Frontend
│   ├── public/                 # Static assets (place resume.pdf here)
│   ├── src/
│   │   ├── api/                # Axios API services & fallback static data
│   │   ├── components/         # Window frame, Desktop panels, Menu & Dock
│   │   │   └── window-contents/ # App-specific content pages
│   │   ├── store/              # Zustand window state manager
│   │   ├── types.ts            # Common declarations
│   │   ├── index.css           # Tailwind v4 directives & animations
│   │   └── main.tsx            # React entry
│   ├── tsconfig.json
│   └── vite.config.ts
├── server/                     # Express Node.js TS Backend
│   ├── src/
│   │   ├── models/             # Mongoose Schemas (About, Project, Experience, Contact)
│   │   ├── routes/             # Express API paths & validation
│   │   ├── scripts/            # Database seed script
│   │   └── server.ts           # Mongoose setup & Express server listeners
│   ├── tsconfig.json
│   └── package.json
└── README.md
```

---

## 🛠️ Setup & Running Locally

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB running locally (`mongodb://127.0.0.1:27017`) or a remote MongoDB Atlas connection string.

---

### Step 1: Run the Backend Server

1. Navigate to `/server`:
    ```bash
    cd server
    ```
2. Install server dependencies:
    ```bash
    npm install
    ```
3. Set up environment configurations:
    *   Create a `.env` file from the template:
        ```bash
        cp .env.example .env
        ```
    *   Ensure the `MONGO_URI` connection parameters match your setup.
4. Seed the database with the real dataset:
    ```bash
    npm run seed
    ```
    *This drops existing records in seeded tables and creates the singleton About profile, Projects (PrepAI, HiringSignal), and Experience histories.*
5. Launch the backend server:
    ```bash
    npm run dev
    ```
    The server will startup on `http://localhost:5000`.

---

### Step 2: Run the Frontend CLIENT

1. In a new terminal tab, navigate to `/client`:
    ```bash
    cd client
    ```
2. Install client dependencies:
    ```bash
    npm install
    ```
3. (Optional) Insert your real PDF resume:
    *   Place your resume document inside `/client/public/resume.pdf` to let the embedded iframe view your real CV in-app.
4. Start the Vite server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:3000` (Vite's custom proxied server) in your browser.

---

## 📈 Quality & Testing
*   **Strict Types:** The frontend and backend run under `strict: true` TypeScript settings, compile cleanly, and enforce type safety across fetch streams.
*   **Snappy Fallback:** The client `api/` utility uses a 3-second timeout. If the MongoDB backend is offline, the client automatically defaults to loading bundled CV state instantly so the experience remains fully browseable.
