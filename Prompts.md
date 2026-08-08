# Prompts.md

This file documents the AI prompt used inside this project (in `api/generate.js`)
to generate cover letters via the Gemini API.

## The Prompt Template

The backend builds this prompt dynamically using the form data submitted by the user:

```
Write a professional cover letter.
Candidate Name: {name}
Job Role: {role}
Company: {company}
Skills: {skills}
Job Description: {jobDescription or "Not provided"}
Resume Details: {resumeText or "Not provided"}

Requirements:
- Professional tone
- Do not mention city, state or phone number unless given
- 300-400 words
- Mention the candidate's skills
- Mention the company name
- End politely
```

## Why the prompt is structured this way

- **Required fields (name, role, company, skills)** are validated on the server
  before the prompt is even built, so the AI never receives an incomplete prompt.
- **Optional fields (job description, resume details)** default to "Not provided"
  instead of being left blank, so the AI doesn't get confused by an empty field
  with no context.
- **Explicit requirements list** at the end constrains tone, length, and content —
  without this, the model's output length and formatting was inconsistent during testing.
- **The instruction to skip personal details unless given** prevents the AI from
  inventing a fake address or phone number to "complete" the letter.

## Model used

`gemini-3-flash-preview` (via Google AI Studio / Gemini API), chosen for speed
and because it was available on the free tier at the time of building this project.
