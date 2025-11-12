import axios from "axios";

export async function getRandomFact(req, res) {
    const optionsDogFact = {
        method: 'GET',
        url: "https://random-dog-facts.p.rapidapi.com/api/dogs",
        headers: {
            'X-RapidAPI-Key': '0b6fd56d9bmsh18593ca331db711p1e8f01jsne1e3672ada9c',
            'X-RapidAPI-Host': 'random-dog-facts.p.rapidapi.com'
        }
    };

    try {
        // 1️⃣ Obtener el dato en inglés
        const response = await axios.request(optionsDogFact);
        const factInEnglish = response.data?.fact || "No se encontró ningún dato.";

        // 2️⃣ Traducir el texto usando la API de Deep Translate
        const translationOptions = {
            method: 'POST',
            url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': '0b6fd56d9bmsh18593ca331db711p1e8f01jsne1e3672ada9c',
                'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com'
            },
            data: {
                q: factInEnglish,
                source: 'en',
                target: 'es'
            }
        };

        const translationResponse = await axios.request(translationOptions);
        const translatedText = translationResponse.data.data.translations.translatedText;

        // 3️⃣ Enviar ambas versiones al cliente
        res.json({
            fact_en: factInEnglish,
            fact_es: translatedText
        });

    } catch (error) {
        console.error("Error al obtener o traducir el dato:", error.message);
        res.status(500).json({ error: "Error al obtener o traducir el dato." });
    }
}
