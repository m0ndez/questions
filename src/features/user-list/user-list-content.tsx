import { useCallback } from "react";
import type { User } from "../../types/user";

export const UserListContent = ({
  users,
  search,
}: {
  users: User[];
  search: string;
}) => {
  const renderTotalUsers = useCallback(() => {
    return (
      <p className="results-info">
        Found {users.length} user(s)
        {search && ` matching "${search}"`}
      </p>
    );
  }, [users, search]);

  const renderUserItems = useCallback(() => {
    return (
      <ul className="user-list">
        {users.length === 0 ? (
          <li className="no-results">
            No users found {search && `for "${search}"`}
          </li>
        ) : (
          users.map((user) => (
            <li key={user.id} className="user-item">
              <span className="user-name">{user.name}</span>
            </li>
          ))
        )}
      </ul>
    );
  }, [search, users]);

  return (
    <>
      {renderTotalUsers()}
      {renderUserItems()}
    </>
  );
};
