import { VALORANT_API_LINK } from "../../../lib/global";
import { Agent } from "../../../lib/types";

export const getValorantAgent = async (): Promise<Agent[]> => {
  try {
    const response = await fetch(`${VALORANT_API_LINK}/agents`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in Fetching Agent Data: ${error.message}`);
    } else {
      throw new Error("Error is Unknown");
    }
  }
};

export const getValorantAgentByUUID = async (
  agentUuid: string
): Promise<Agent> => {
  try {
    const response = await fetch(`${VALORANT_API_LINK}/agents/${agentUuid}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching agent data: ${error.message}`);
    } else {
      throw new Error("Error is unknown");
    }
  }
};
