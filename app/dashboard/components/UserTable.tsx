"use client";

import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/app/store/slices/usersSlice";
import { Input, Card } from "@/app/components";
import { User } from "@/app/store/slices/usersSlice";

interface UserTableProps {
  users: User[];
  loading: boolean;
  searchQuery: string;
  currentPage: number;
  onSearch: (query: string) => void;
}

const ITEMS_PER_PAGE = 20;

const UserTable = ({
  users,
  loading,
  searchQuery,
  currentPage,
  onSearch,
}: UserTableProps) => {
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;

    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
      const email = user.email.toLowerCase();
      const query = searchQuery.toLowerCase();

      return fullName.includes(query) || email.includes(query);
    });
  }, [users, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  if (loading) {
    return <Card title="Users">Loading...</Card>;
  }

  return (
    <Card title="Users List">
      <div style={{ marginBottom: "1rem" }}>
        <Input
          placeholder="Search by name or email..."
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead
            style={{
              backgroundColor: "var(--card-border, #e5e7eb)",
            }}
          >
            <tr>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                }}
              >
                First Name
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                }}
              >
                Last Name
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                }}
              >
                Age
              </th>
              <th
                style={{
                  padding: "0.5rem 1rem",
                  textAlign: "left",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                }}
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr
                  key={user.id}
                  style={{
                    backgroundColor: "var(--card-bg)",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "var(--muted, #f3f4f6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--card-bg)";
                  }}
                >
                  <td
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                      color: "var(--foreground)",
                    }}
                  >
                    {user.firstName}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                      color: "var(--foreground)",
                    }}
                  >
                    {user.lastName}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                      color: "var(--foreground)",
                    }}
                  >
                    {user.email}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                      color: "var(--foreground)",
                    }}
                  >
                    {user.age}
                  </td>
                  <td
                    style={{
                      padding: "0.5rem 1rem",
                      borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                      color: "var(--foreground)",
                    }}
                  >
                    {user.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    color: "var(--muted, #6b7280)",
                    padding: "1rem",
                    borderBottom: `1px solid var(--card-border, #e5e7eb)`,
                  }}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
          padding: "1rem",
          borderTop: `1px solid var(--card-border, #e5e7eb)`,
        }}
      >
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor:
              currentPage === 1
                ? "var(--muted, #6b7280)"
                : "var(--primary, #2563eb)",
            color: "#ffffff",
            borderRadius: "0.375rem",
            border: "none",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? 0.6 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (currentPage > 1)
              e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          Previous
        </button>
        <span style={{ color: "var(--foreground)", fontWeight: "500" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor:
              currentPage === totalPages
                ? "var(--muted, #6b7280)"
                : "var(--primary, #2563eb)",
            color: "#ffffff",
            borderRadius: "0.375rem",
            border: "none",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? 0.6 : 1,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            if (currentPage < totalPages)
              e.currentTarget.style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = "brightness(1)";
          }}
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default UserTable;
