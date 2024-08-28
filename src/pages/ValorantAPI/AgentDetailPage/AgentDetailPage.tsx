import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Ability, Agent } from "../../../lib/types";
import { getValorantAgentByUUID } from "../../../actions/get/getValorant";
import Loader from "../../../components/Loader/Loader";
import Back from "../../../assets/previous.png";

import "./AgentDetailPage.css";

const AgentDetailPage: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        if (uuid) {
          const agentData = await getValorantAgentByUUID(uuid);
          setAgent(agentData);
        }
      } catch (error) {
        console.error("Error fetching agent details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgent();
  }, [uuid]);

  if (isLoading) {
    return <Loader />;
  }

  if (!agent) {
    return (
      <div>
        {" "}
        <Link to="/ValorantPage">Back</Link>Agent not found
      </div>
    );
  }

  return (
    <div className="agent-detail-container">
      <div className="back-button">
        <Link to="/ValorantPage">
          <img src={Back} alt="back-icon" />
        </Link>
      </div>
      <div className="agent-content-contaner">
        <div className="agent-name-container">
          <h1>{agent.displayName}</h1>
        </div>
        <div className="agent-showcase-container">
          <div className="discription-container">
            <p>{agent.description}</p>
            <div className="agent-role-container">
              <div className="agent-role-name">
                <h3>Role: {agent.role.displayName}</h3>
                <img
                  src={agent.role.displayIcon}
                  alt={`${agent.role.displayName}-icon`}
                />
              </div>
              <div className="agent-role-detail">
                <p>{agent.role.description}</p>
              </div>
            </div>
            <div className="ability-description">
              <h3>Abilities</h3>

              {agent.abilities.map((ability: Ability) => (
                <div key={ability.displayName} className="">
                  <h5>{ability.displayName}</h5>
                  <p>{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="agent-overview"
            style={{
              backgroundImage: `url(${agent.background})`,
              backgroundColor: `#${agent.backgroundGradientColors[1]}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p>{agent.displayName}</p>
            <img
              src={agent.fullPortrait}
              alt={`${agent.displayName}-portrait`}
            />
            <div className="ability-grid-container">
              {agent.abilities.map((ability) => (
                <div key={ability.slot} className="ability-container">
                  <img src={ability.displayIcon} alt={`${ability.slot}`} />
                  <p>{ability.displayName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;
