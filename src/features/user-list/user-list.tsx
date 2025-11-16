import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ChangeEvent,
} from "react";

import { useApi, useDebounce } from "../../hooks";
import { getUsers } from "../../services/users";
import { ContentError, SearchInput, Spinner } from "../../components";

import { UserListContent } from "./user-list-content";

import "./user-list.css";

export const UserList = () => {
  const [{ data: users = [], isLoading, isError, error }, fetchUser] =
    useApi(getUsers);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const debouncedSearch = useDebounce(search, 300);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearch.trim()) return users;

    const searchLower = debouncedSearch.toLowerCase();
    return users.filter((user) =>
      user.name.toLowerCase().includes(searchLower)
    );
  }, [users, debouncedSearch]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearch("");
  }, []);

  if (isError) {
    return <ContentError message={error?.message} />;
  }

  return (
    <div className="user-list-container">
      <SearchInput
        isLoading={isLoading}
        onChange={handleSearchChange}
        onClear={handleClearSearch}
        value={search}
      />

      {isLoading ? (
        <Spinner />
      ) : (
        <UserListContent users={filteredUsers} search={debouncedSearch} />
      )}
    </div>
  );
};
