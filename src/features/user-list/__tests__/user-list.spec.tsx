import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserList } from "../user-list";
import * as useApiModule from "../../../hooks/use-api";
import * as useDebounceModule from "../../../hooks/use-debounce";
import "@testing-library/jest-dom";

// Mock the hooks
vi.mock("../../../hooks/use-api");
vi.mock("../../../hooks/use-debounce");

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

describe("UserList", () => {
  const mockFetchUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // By default, useDebounce returns the value immediately
    vi.mocked(useDebounceModule.useDebounce).mockImplementation(
      (value) => value
    );
  });

  it("should render loading spinner when loading", () => {
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: [], isLoading: true, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("should fetch users on mount", () => {
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: [], isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    expect(mockFetchUser).toHaveBeenCalledTimes(1);
    expect(mockFetchUser).toHaveBeenCalledWith();
  });

  it("should render error message when error occurs", () => {
    const errorMessage = "Failed to fetch users";
    vi.mocked(useApiModule.useApi).mockReturnValue([
      {
        data: [],
        isLoading: false,
        isError: true,
        error: { message: errorMessage } as Error,
      },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render user list when data is loaded", () => {
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
    expect(screen.getByText("Found 3 user(s)")).toBeInTheDocument();
  });

  it("should filter users based on search input", async () => {
    const user = userEvent.setup();
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    const searchInput = screen.getByLabelText("Search");

    await user.type(searchInput, "John");

    expect(searchInput).toHaveValue("John");

    // Verify filtered results - "John" matches "John Doe" and "Bob Johnson"
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.getByText("Bob Johnson")).toBeInTheDocument(); // Contains "John"son
    });
  });

  it("should debounce search input", () => {
    const mockDebounce = vi.fn((value) => value);
    vi.mocked(useDebounceModule.useDebounce).mockImplementation(mockDebounce);
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);

    // Verify debounce was called with initial empty string and 300ms delay
    expect(mockDebounce).toHaveBeenCalledWith("", 300);
  });

  it("should clear search input when clear button is clicked", async () => {
    const user = userEvent.setup();
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    const searchInput = screen.getByLabelText("Search");

    await user.type(searchInput, "test");
    expect(searchInput).toHaveValue("test");

    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    await waitFor(() => {
      expect(searchInput).toHaveValue("");
    });
  });

  it("should show all users when search is empty", () => {
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("should show no results when no users match search", async () => {
    const user = userEvent.setup();
    vi.mocked(useApiModule.useApi).mockReturnValue([
      { data: mockUsers, isLoading: false, isError: false, error: undefined },
      mockFetchUser,
    ] as const);

    render(<UserList />);
    const searchInput = screen.getByLabelText("Search");

    await user.type(searchInput, "xyz123nonexistent");

    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
      expect(screen.queryByText("Bob Johnson")).not.toBeInTheDocument();
      expect(screen.getByText(/No users found/i)).toBeInTheDocument();
    });
  });
});
