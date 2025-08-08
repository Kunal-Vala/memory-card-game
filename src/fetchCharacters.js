import fs from "fs";
import fetch from "node-fetch";

const apiKey = "6a83e0a70b6ab4920e5404e876a316274a434cc3";
const url = `https://www.giantbomb.com/api/characters/?api_key=${apiKey}&format=json&field_list=id,name,image`;

async function fetchAndSaveCharacters() {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "MemoryGame/1.0",
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    if (!data.results) {
      throw new Error("No results found");
    }
    // Map to only id, name, and icon_url
    const cards = data.results.map((item) => ({
      id: item.id,
      name: item.name,
      icon_url: item.image?.icon_url || "",
    }));
    fs.writeFileSync("card.json", JSON.stringify(cards, null, 2));
    console.log("card.json created with", cards.length, "cards.");
  } catch (err) {
    console.error("Error fetching or saving cards:", err);
  }
}

fetchAndSaveCharacters();