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
      <div className="mb-4">
        <Input
          placeholder="Search by name or email..."
          value={localSearch}
          onChange={handleSearchChange}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                First Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                Last Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                Email
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                Age
              </th>
              <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b border-gray-200">
                    {user.firstName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {user.lastName}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {user.age}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {user.role}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 px-4 border-b border-gray-200"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 p-4 border-t">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Previous
        </button>
        <span className="text-gray-700 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </Card>
  );
};

export default UserTable;
