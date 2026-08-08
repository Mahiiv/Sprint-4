const form = document.getElementById("coverLetterForm");
const loadingBox = document.getElementById("loading");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const errorBox = document.getElementById("errorBox");
const copyBtn = document.getElementById("copyBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  
  resultBox.classList.add("hidden");
  errorBox.classList.add("hidden");
  loadingBox.classList.remove("hidden");

  const data = {
    name: document.getElementById("name").value.trim(),
    role: document.getElementById("role").value.trim(),
    company: document.getElementById("company").value.trim(),
    skills: document.getElementById("skills").value.trim(),
    jobDescription: document.getElementById("jobDescription").value.trim(),
    resumeText: document.getElementById("resumeText").value.trim(),
  };

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    loadingBox.classList.add("hidden");

    if (!result.success) {
      showError(result.message || "Something went wrong.");
      return;
    }

   
    resultText.textContent = result.coverLetter;
    resultBox.classList.remove("hidden");
  } catch (err) {
    loadingBox.classList.add("hidden");
    showError("Could not reach the server. Please try again.");
  }
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(resultText.textContent).then(() => {
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy to Clipboard";
    }, 1500);
  });
});
