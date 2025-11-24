"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import {
  setUsers,
  setLoading,
  setError,
  setSearchQuery,
} from "@/app/store/slices/usersSlice";
import { Button } from "@/app/components";
import ThemeToggle from "@/app/components/ThemeToggle/ThemeToggle";
import { fetchUsers } from "./api";
import UserTable from "./components/UserTable";
import AnalyticsCards from "./components/AnalyticsCards";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const {
    data: users,
    loading,
    searchQuery,
    currentPage,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true));
      try {
        const usersData = await fetchUsers();
        dispatch(setUsers(usersData));
        dispatch(setError(null));
      } catch {
        dispatch(setError("Failed to fetch users"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (users.length === 0) {
      loadUsers();
    }
  }, [dispatch, users.length]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background, #ffffff)",
        padding: "1.5rem",
        transition: "background-color 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          backgroundColor: "var(--card-bg, #ffffff)",
          padding: "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--card-border, #e5e7eb)",
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            color: "var(--foreground)",
          }}
        >
          HR Dashboard
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <ThemeToggle />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "1.5rem",
        }}
      >
        <div style={{ gridColumn: "span 3" }}>
          <UserTable
            users={users}
            loading={loading}
            searchQuery={searchQuery}
            currentPage={currentPage}
            onSearch={handleSearch}
          />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <AnalyticsCards users={users} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
