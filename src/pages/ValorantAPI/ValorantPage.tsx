import { useEffect, useState } from "react";
import { Agent, Role } from "../../lib/types";
import { getValorantAgent } from "../../actions/get/getValorant";
import AgentCards from "../../components/AgentCards/AgentCards";
import { Roles } from "../../lib/global";
import RoleCards from "../../components/RoleCards/RoleCards";
import MenuIcon from "../../assets/dots-menu.png";
import "./ValorantPage.css";
import Loader from "../../components/Loader/Loader";
const ValorantPage = () => {
  const [agentList, setAgentList] = useState<Agent[]>([]);
  const [temp, setTempList] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFilterByRoles = async (Role: string): Promise<Agent[]> => {
    setAgentList(temp);
    const filteredAgents = temp.filter(
      (agent) => agent?.role?.displayName === Role
    );
    return filteredAgents;
  };

  const handleSetAllAgents = () => {
    setAgentList(temp);
  };

  const handleGetAgents = async () => {
    setIsLoading(true);
    try {
      const agents = await getValorantAgent();
      setAgentList(agents);
      setTempList(agents);
    } catch (error: Error | any) {
      if (Error instanceof Error) {
        console.log(`Error in retreiving Agents: ${error.message}`);
      } else {
        console.log("Error is unknown");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAgents();
  }, []);

  useEffect(() => {
    const handleSearchAgent = async (searchQuery: string) => {
      setIsLoading(true);
      try {
        const searchedAgent = temp.filter((agent: Agent) =>
          agent.displayName.toLowerCase().includes(searchQuery)
        );
        setAgentList(searchedAgent);
      } catch (error: Error | any) {
        if (Error instanceof Error) {
          console.log(`Error in retreiving Agents: ${error.message}`);
        } else {
          console.log("Error is unknown");
        }
      } finally {
        setIsLoading(false);
      }
    };
    handleSearchAgent(searchQuery);
  }, [searchQuery]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="valorant-page-container">
      <div className="header">
        <h1>Agents</h1>
        <div className="role-list-container">
          <div className="role-card-container">
            <img
              src={MenuIcon}
              alt="all-icon"
              onClick={() => handleSetAllAgents()}
            />
          </div>
          {Roles &&
            Roles.map((role: Role) => (
              <RoleCards
                key={role.uuid}
                role={role}
                setAgentList={setAgentList}
                handleFilterByRoles={handleFilterByRoles}
              />
            ))}
        </div>
        <input
          name="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="agent-list-container">
        {agentList && agentList.length !== 0
          ? agentList.map((agent: Agent) => (
              <AgentCards key={agent.uuid} agent={agent} />
            ))
          : "No agents found"}
      </div>
    </div>
  );
};

export default ValorantPage;
