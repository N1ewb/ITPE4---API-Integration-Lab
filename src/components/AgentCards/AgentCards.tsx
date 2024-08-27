import { Link } from "react-router-dom";
import { Agent } from "../../lib/types";

import "./AgentCards.css";

interface AgentCardsProps {
  agent: Agent;
}

const AgentCards = ({ agent }: AgentCardsProps) => {
  return (
    <div className="agent-card-container">
      <Link to={`/ValorantPage/${agent.uuid}`}>
        <img
          src={agent.displayIconSmall}
          alt={`${agent.displayName}-display icon`}
        />
      </Link>
      <p>{agent.displayName}</p>
    </div>
  );
};

export default AgentCards;
