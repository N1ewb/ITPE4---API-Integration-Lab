import { RestAPIUser } from "../../lib/types";
import "./RestAPIUserscard.css";

interface RestAPIUserscardProps {
  user: RestAPIUser;
}

const RestAPIUserscard = ({ user }: RestAPIUserscardProps) => {
  return (
    <div className="user-card">
      <div className="user-card-header">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
      <div className="user-card-body">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={`http://${user.website}`} target="_blank" rel="noreferrer">
            {user.website}
          </a>
        </p>
        <p>
          <strong>Company:</strong> {user.company.name}
        </p>
      </div>
    </div>
  );
};

export default RestAPIUserscard;
