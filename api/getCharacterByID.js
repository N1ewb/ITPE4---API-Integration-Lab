import CircularJSON from "circular-json";
import { EnkaClient } from "enka-network-api";

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://itpe4lucero-git-main-n1ewbs-projects.vercel.app",
  "https://luceroitpe4.netlify.app",
];

const enka = new EnkaClient({
  showFetchCacheLog: true,
});

// Async function to setup cache and activate auto-updater
async function initializeEnkaClient() {
  await enka.cachedAssetsManager.cacheDirectorySetup();
  enka.cachedAssetsManager.activateAutoCacheUpdater({
    instant: true,
    timeout: 60 * 60 * 1000, // 1 hour
    onUpdateStart: async () => {
      console.log("Updating Genshin Data...");
    },
    onUpdateEnd: async () => {
      await enka.cachedAssetsManager.refreshAllData();
      console.log("Updating Completed!");
    },
  });
}

// Ensure EnkaClient is initialized
let enkaInitialized = false;

async function getCharacters(characterId) {
  // Initialize EnkaClient if not already done
  if (!enkaInitialized) {
    await initializeEnkaClient();
    enkaInitialized = true;
  }

  // Fetch characters after initialization
  const characters = await enka.getCharacterById(characterId); // Ensure this is awaited
  return CircularJSON.stringify(characters);
}

export default async function handler(req, res) {
  const origin = req.headers.origin;

  res.send("Origin: ", origin);

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  const characterId = parseInt(req.query.id, 10);
  if (isNaN(characterId)) {
    return res.status(400).json({ error: "Invalid character ID" });
  }

  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const character = await getCharacters(characterId);
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(character);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: error.message });
  }
}
