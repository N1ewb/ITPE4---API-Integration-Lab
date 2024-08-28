const CircularJSON = require("circular-json");
const { EnkaClient } = require("enka-network-api");
const fs = require("fs");

// Set up cache directory
const cacheDir = "/tmp/cache";
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

// Initialize EnkaClient
const enka = new EnkaClient({
  cacheDirectory: cacheDir,
  showFetchCacheLog: true,
});

(async () => {
  try {
    // Setup cache directory and download assets
    await enka.cachedAssetsManager.cacheDirectorySetup();

    // Start cache updater
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

    // Refresh data to ensure everything is in place
    await enka.cachedAssetsManager.refreshAllData();
  } catch (err) {
    console.error("Error during setup or update:", err);
  }
})();

exports.handler = async function (event, context) {
  try {
    // Wait for cache to be ready by checking and initializing if necessary
    await enka.cachedAssetsManager.cacheDirectorySetup();

    const characters = enka.getAllCharacters(); // Fetch all characters
    const jsonString = CircularJSON.stringify(characters); // Convert to JSON

    return {
      statusCode: 200,
      body: jsonString,
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error fetching characters:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
