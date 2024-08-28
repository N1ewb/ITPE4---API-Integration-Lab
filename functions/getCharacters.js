import { EnkaClient } from "enka-network-api";
import CircularJSON from "circular-json";

const enka = new EnkaClient({
  cacheDirectory: "/tmp/cache",
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

exports.handler = async function (event, context) {
  try {
    const characters = enka.getAllCharacters();
    const jsonString = CircularJSON.stringify(characters);

    return {
      statusCode: 200,
      body: JSON.stringify(jsonString),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
