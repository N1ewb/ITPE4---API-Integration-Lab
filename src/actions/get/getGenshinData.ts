import { GenshinCharacter } from "../../lib/types";

export const getGenshinCharacter = async (): Promise<GenshinCharacter[]> => {
  let characters: GenshinCharacter[] = [];

  try {
    const urls = [
      "https://itpe-4-api-integration-lab.vercel.app/api/getCharacters",
      "/api/characters",
      "/.netlify/functions/getCharacters",
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          characters = await response.json();
          console.log(characters);
          return characters;
        }
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
      }
    }

    console.warn("All fetch attempts failed.");
    return characters;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error in fetching genshin character data: ${error.message}`
      );
    } else {
      console.error("Unknown error occurred");
    }

    return characters;
  }
};

export const getGenshinCharacterByID = async (
  id: string
): Promise<GenshinCharacter> => {
  let characters;

  try {
    const urls = [
      `https://itpe-4-api-integration-lab.vercel.app/api/getCharacterByID?id=${id}`,
      `/api/charactersByID?id=${id}`,
      `/.netlify/functions/getCharactersByID?id=${id}`,
    ];

    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) {
          characters = await response.json();
          console.log(characters);
          return characters;
        }
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
      }
    }

    console.warn("All fetch attempts failed.");
    return characters;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error in fetching genshin character data: ${error.message}`
      );
    } else {
      console.error("Unknown error occurred");
    }

    return characters;
  }
};
