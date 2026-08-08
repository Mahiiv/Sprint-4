// loads the .env file so process.env.GEMINI_API_KEY works
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const generateRoute = require("./api/generate");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// serve the frontend files (index.html, style.css, script.js)
app.use(express.static(path.join(__dirname, "public")));

// the api route that talks to Gemini
app.use("/api", generateRoute);

// send index.html for the homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// simple 404 for anything else
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
