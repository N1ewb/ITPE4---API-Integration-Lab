import { RestAPIUser } from "../../lib/types";
import RestAPIUserscard from "./RestAPIUserscard";

import "./RestAPIUsers.css";

interface RestAPIUsersProps {
  users: RestAPIUser[];
}

const RestAPIUsers = ({ users }: RestAPIUsersProps) => {
  return (
    <div className="users-list-container">
      {users &&
        users.map((user: RestAPIUser) => (
          <RestAPIUserscard key={user.id} user={user} />
        ))}
    </div>
  );
};

export default RestAPIUsers;
