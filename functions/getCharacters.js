const CircularJSON = require("circular-json");
const { EnkaClient } = require("enka-network-api");
const fs = require("fs");
const path = require("path");

// Set up cache directory
const cacheDir = "/tmp/cache";
const dataDir = path.join(cacheDir, "data");
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
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

    // Ensure data is refreshed and available
    await enka.cachedAssetsManager.refreshAllData();
  } catch (err) {
    console.error("Error during setup or update:", err);
  }
})();

exports.handler = async function (event, context) {
  try {
    // Ensure that the necessary data file exists and is valid
    const avatarConfigPath = path.join(dataDir, "AvatarExcelConfigData.json");

    if (!fs.existsSync(avatarConfigPath)) {
      throw new Error(`Required data file not found: ${avatarConfigPath}`);
    }

    // Read the data file and ensure it's valid JSON
    const rawData = fs.readFileSync(avatarConfigPath, "utf-8");

    // Validate JSON data
    let parsedData;
    try {
      parsedData = JSON.parse(rawData);
    } catch (jsonError) {
      console.error("Invalid JSON format in file:", avatarConfigPath);
      throw new Error(
        "Failed to parse JSON data. Data may be incomplete or corrupted."
      );
    }

    // Fetch all characters after ensuring cache is ready
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
