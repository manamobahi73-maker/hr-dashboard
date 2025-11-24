import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  role: string;
  address: {
    city: string;
  };
}

interface UsersState {
  data: User[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
}

const initialState: UsersState = {
  data: [],
  loading: false,
  error: null,
  searchQuery: "",
  currentPage: 1,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setUsers,
  setLoading,
  setError,
  setSearchQuery,
  setCurrentPage,
} = usersSlice.actions;
export default usersSlice.reducer;
