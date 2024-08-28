const express = require("express");
const CircularJSON = require("circular-json");
const { EnkaClient } = require("enka-network-api");

const app = express();
app.use(express.json());

const enka = new EnkaClient({
  cacheDirectory: "./cache",
  showFetchCacheLog: true,
});

enka.cachedAssetsManager.cacheDirectorySetup();
enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true,
  timeout: 60 * 60 * 1000,
  onUpdateStart: async () => {
    console.log("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData();
    console.log("Updating Completed!");
  },
});

app.get("/", (req, res) => {
  res.send("Welcome to the Enka Network API Server!");
});

app.get("/api/characters", async (req, res) => {
  try {
    const characters = enka.getAllCharacters();
    const jsonString = CircularJSON.stringify(characters);
    res.send(jsonString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/charactersByID", async (req, res) => {
  const characterId = parseInt(req.query.id, 10);
  if (isNaN(characterId)) {
    return res.status(400).json({ error: "Invalid character ID" });
  }

  try {
    const character = await enka.getCharacterById(characterId);
    const jsonString = CircularJSON.stringify(character);
    res.status(200).send(jsonString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
