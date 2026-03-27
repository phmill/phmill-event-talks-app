# TechTalks 2026 - Event Schedule App

A modern, high-performance single-day technical event website. This application provides a seamless experience for attendees to explore talk schedules, search by topic, and filter by category in a sleek dark-themed interface.

## 🚀 Features

- **Automated Scheduling:** 6 technical talks of 1 hour each, starting at 10:00 AM with 10-minute transitions.
- **Dynamic Content:** Real-time search and category filtering for quick access to specific topics.
- **Smart UI:** Dedicated lunch break slot automatically integrated into the main schedule.
- **Dark Mode Design:** A premium, tech-focused aesthetic using modern CSS (Flexbox/Grid).
- **Responsive:** Optimized for both desktop and mobile viewing.
- **Lightweight Backend:** Powered by Node.js and Express for fast static file serving and data API.

## 🛠️ Tech Stack

- **Server-side:** Node.js, Express.js
- **Front-end:** HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Data:** JSON-based storage for easy updates.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- npm (comes with Node.js)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/phmill/phmill-event-talks-app.git
   cd phmill-event-talks-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   node server.js
   ```

4. **View the app:**
   Open your browser and navigate to `http://localhost:3000`

## 📂 Project Structure

```text
.
├── server.js          # Express server & API routes
├── data/
│   └── talks.json     # Conference data (titles, speakers, etc.)
├── public/
│   ├── index.html     # Main application shell
│   ├── style.css      # Dark mode styling & layout
│   └── script.js      # Fetching, filtering & rendering logic
├── package.json       # Project dependencies
└── .gitignore         # Git exclusion rules
```

## 📝 How to Customize Talks

To update the event content, simply edit the `data/talks.json` file. Each talk object follows this structure:

```json
{
  "id": 1,
  "title": "Your Talk Title",
  "speakers": ["Speaker Name"],
  "categories": ["Category1", "Category2"],
  "startTime": "10:00 AM",
  "endTime": "11:00 AM",
  "description": "Short talk description."
}
```

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.
