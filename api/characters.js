// api/characters.js

import express from "express";
import { EnkaClient } from "enka-network-api";
import { stringify } from "flatted";

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

const app = express();
app.use(express.json());

app.get("/api/characters", async (req, res) => {
  try {
    const characters = enka.getAllCharacters();
    const jsonString = stringify(characters);
    res.status(200).json(jsonString);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default (req, res) => {
  return new Promise((resolve) => {
    app(req, res, resolve);
  });
};
