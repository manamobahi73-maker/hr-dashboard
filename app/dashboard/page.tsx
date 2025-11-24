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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
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
