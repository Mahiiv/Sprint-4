# AI Cover Letter Generator

A web app that generates a personalized cover letter using the Google Gemini API.
Fill in your name, the job role, the company, and your skills — optionally add a
job description and a short resume summary — and get a ready-to-use cover letter
in seconds.

**Live Demo:https://sprint-4-kwlb.onrender.com/

## Features

- Generates a professional, 300-400 word cover letter tailored to the role and company
- Optional fields for job description and resume summary for a more personalized result
- Copy-to-clipboard button for the generated letter
- Server-side input validation with clear error messages
- API key kept fully server-side — never exposed to the browser

## Tech Stack

- **Backend:** Node.js, Express
- **AI:** Google Gemini API (`@google/genai`)
- **Frontend:** Vanilla HTML, CSS, JavaScript (no framework)
- **Deployment:** Render

## Project Structure

```
cover-letter-gen/
├── server.js           # Express server, serves the frontend + API
├── api/
│   └── generate.js     # API route that calls Gemini
├── public/
│   ├── index.html       # the page
│   ├── style.css         # styling
│   └── script.js          # frontend logic (talks to the API)
├── package.json
├── Prompts.md           # documents the AI prompt used
├── .env.example
└── .gitignore
```

## Why the API key is server-side

If the Gemini API key was written directly into `script.js`, anyone could open
the browser's dev tools and view it in plain text. Instead, `api/generate.js`
runs on the server and reads the key from an environment variable
(`process.env.GEMINI_API_KEY`), which is never sent to the browser. `.env` is
listed in `.gitignore` so the real key never reaches GitHub.

## Running it locally

1. Clone this repo and install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and add your own Gemini API key:
   ```
   cp .env.example .env
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open `http://localhost:3000` in your browser.

## Getting a Gemini API key

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with a Google account and create a free API key.
3. Paste it into your `.env` file (locally) or your host's Environment
   Variables settings (when deployed).

## Deployment (Render)

This app runs as a persistent Express server, so it's deployed on Render
rather than a serverless platform.

1. Push this project to a GitHub repo (make sure `.env` is not included).
2. Go to [render.com](https://render.com) and sign in with GitHub.
3. Click **New +** → **Web Service** → select this repo.
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment**, add a variable:
   - `GEMINI_API_KEY` = your real key
6. Click **Deploy**. Render gives you a live `.onrender.com` URL once the
   build finishes.

Note: on Render's free tier, the app "sleeps" after inactivity — the first
request after idle time can take 30-60 seconds to respond while it wakes up.

## Security Notes

- User input is inserted into the page using `textContent`, not `innerHTML`,
  so nothing typed into the form can execute as code.
- Required fields (name, role, company, skills) are validated before the
  request is sent to Gemini, so incomplete prompts never reach the API.
