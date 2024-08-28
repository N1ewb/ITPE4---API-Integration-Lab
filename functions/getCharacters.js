const CircularJSON = require("circular-json");
const { EnkaClient } = require("enka-network-api");
const { stringify } = require("flatted");
const fs = require("fs");
const path = require("path");

const cacheDir = "/tmp/cache";
if (!fs.existsSync(cacheDir)) {
  fs.mkdirSync(cacheDir, { recursive: true });
}

const enka = new EnkaClient({
  cacheDirectory: cacheDir,
  showFetchCacheLog: true,
});

(async () => {
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
})();

exports.handler = async function (event, context) {
  try {
    await enka.cachedAssetsManager.waitForCacheReady();
    const characters = enka.getAllCharacters();
    const jsonString = CircularJSON.stringify(characters);
    return {
      statusCode: 200,
      body: jsonString,
      headers: {
        "Content-Type": "application/json",
      },
    };
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
