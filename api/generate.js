const express = require("express");
const { GoogleGenAI } = require("@google/genai");

const router = express.Router();

// this reads the key from the .env file, never from the frontend
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.post("/generate", async (req, res) => {
  try {
    const { name, role, company, skills, jobDescription, resumeText } = req.body;

    // basic check so we don't send an empty prompt to Gemini
    if (!name || !role || !company || !skills) {
      return res.status(400).json({
        success: false,
        message: "Please fill in name, role, company and skills.",
      });
    }

    // this is the actual instruction we send to the AI
    const prompt = `
Write a professional cover letter.
Candidate Name: ${name}
Job Role: ${role}
Company: ${company}
Skills: ${skills}
Job Description: ${jobDescription || "Not provided"}
Resume Details: ${resumeText || "Not provided"}

Requirements:
- Professional tone
- Do not mention city, state or phone number unless given
- 300-400 words
- Mention the candidate's skills
- Mention the company name
- End politely
`;

    const response = await ai.models.generateContent({
      model:"gemini-3-flash-preview",
      contents: prompt,
    });

    const coverLetter = response.text;

    res.json({ success: true, coverLetter });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
