import axios from "axios";

// Example using LibreTranslate
const API_URL = "https://libretranslate.de/translate";

export async function translateText(sentence, targetLanguage) {
    console.log("Sentence: ", sentence);
    console.log("Target language: ", targetLanguage);
    try {
        const response = await axios.post(API_URL, {
            q: sentence,
            source: "en", // assuming the source language is English
            target: targetLanguage,
            format: "text"
        }, {
            headers: { "Content-Type": "application/json" }
        });
        return response.data.translatedText;
    } catch (error) {
        console.error("Error translating text, please try again later.");
        return null;
    }
}
