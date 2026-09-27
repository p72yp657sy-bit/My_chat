// Ai-lyrics.js - moduł obsługujący OpenRouter

const OPENROUTER_API_KEY = "TUTAJ_WKLEJ_SWÓJ_KLUCZ_OPENROUTER"; 
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

// Możesz podać domyślny model, np. darmowy lub tani model z OpenRouter
const DEFAULT_MODEL = "deepseek/deepseek-chat"; 

async function generateLyrics(promptText, modelName = DEFAULT_MODEL) {
  try {
    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://twoja-strona-lub-aplikacja.local", // Opcjonalnie dla rankingów OpenRouter
        "X-Title": "https://nextchat-polonizator.vercel.app/", // Opcjonalna nazwa aplikacji
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: promptText
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Wystąpił błąd podczas komunikacji z OpenRouter.");
    }

    // Zwracamy wygenerowaną treść
    return data.choices[0].message.content;

  } catch (error) {
    console.error("Błąd w Ai-lyrics.js:", error.message);
    throw error;
  }
}

export { generateLyrics };
