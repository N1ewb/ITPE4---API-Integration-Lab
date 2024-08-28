import CircularJSON from "circular-json";
import { EnkaClient } from "enka-network-api";
import { stringify } from "flatted";
import fs from "fs";
import path from "path";

const cacheDir = "/tmp/cache";
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const enka = new EnkaClient({
  cacheDirectory: cacheDir,
  showFetchCacheLog: true,
});

await enka.cachedAssetsManager.cacheDirectorySetup();
await new Promise((resolve) => setTimeout(resolve, 5000));
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

exports.handler = async function (event, context) {
  try {
    await enka.cachedAssetsManager.waitForCacheReady();

    const characters = enka.getAllCharacters();
    const jsonString = CircularJSON.stringify(characters);
    return jsonString;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};
