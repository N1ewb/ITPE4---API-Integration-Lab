import { EnkaClient } from "enka-network-api";
import { stringify } from "flatted";

const enka = new EnkaClient({
  cacheDirectory: "/tmp/cache",
  showFetchCacheLog: true,
});

// Setup cache and activate auto-updater
(async () => {
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
})();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const characters = enka.getAllCharacters();
    const jsonString = stringify(characters);
    res.status(200).json(jsonString);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).json({ error: error.message });
  }
}
