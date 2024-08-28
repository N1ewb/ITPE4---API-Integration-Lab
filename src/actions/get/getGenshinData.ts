import { GenshinCharacter } from "../../lib/types";

export const getGenshinCharacter = async (): Promise<GenshinCharacter[]> => {
  try {
    const response = await fetch("/api/getCharacters");
    if (!response.ok) {
      const response = await fetch("/.netlify/functions/getCharacters");
      if (!response.ok) {
        const response = await fetch("/api/characters");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok. Status: ${response.status}`
          );
        }
      }
    }
    const characters: GenshinCharacter[] = await response.json();
    console.log(characters);
    return characters;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching genshin character data: ${error.message}`
      );
    } else {
      throw new Error("Unknown error");
    }
  }
};
