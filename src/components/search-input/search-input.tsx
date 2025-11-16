import type { ChangeEventHandler } from "react";
import "./search-input.css";

type SearchInputProps = {
  value: string;
  isLoading?: boolean;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onClear?: () => void;
};

export const SearchInput = ({
  value,
  placeholder = "Search users...",
  isLoading,
  onChange,
  onClear,
}: SearchInputProps) => {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search"
        disabled={isLoading}
      />
      {value && (
        <button
          onClick={onClear}
          className="clear-button"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
