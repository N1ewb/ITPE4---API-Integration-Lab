import { RestAPIUser } from "../../../lib/types";

export const getUserData = async (): Promise<RestAPIUser[]> => {
  try {
    const APIUrl = "https://jsonplaceholder.typicode.com/users";

    const response = await fetch(APIUrl);
    if (!response.ok) {
      throw new Error(`HTTPS Error! Status: ${response.status} `);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error("Error URL unknown");
    } else {
      throw new Error("Unknown Error");
    }
  }
};
