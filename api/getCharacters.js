import CircularJSON from "circular-json";
import { EnkaClient } from "enka-network-api";

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

async function getCharacters() {
  // Initialize EnkaClient if not already done
  if (!enkaInitialized) {
    await initializeEnkaClient();
    enkaInitialized = true;
  }

  // Fetch characters after initialization
  const characters = await enka.getAllCharacters(); // Ensure this is awaited
  return CircularJSON.stringify(characters);
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const jsonString = await getCharacters(); // Await getCharacters()
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(jsonString);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: error.message });
  }
}
