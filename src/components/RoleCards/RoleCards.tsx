import { Agent, Role } from "../../lib/types";
import "./RoleCards.css";

interface RoleCardsProps {
  role: Role;
  handleFilterByRoles: (role: string) => Promise<Agent[]>;
  setAgentList: React.Dispatch<React.SetStateAction<Agent[]>>;
}

const RoleCards = ({
  role,
  handleFilterByRoles,
  setAgentList,
}: RoleCardsProps) => {
  const handleFilterFunction = async () => {
    const agents = await handleFilterByRoles(role.displayName);
    setAgentList(agents);
  };

  return (
    <div className="role-card-container">
      <img
        src={role.displayIcon}
        alt={`${role.displayName}-icon`}
        onClick={() => handleFilterFunction()}
      />
    </div>
  );
};

export default RoleCards;
