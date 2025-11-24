import axios from "axios";

const API_BASE_URL = "https://dummyjson.com";

export const fetchUsers = async (limit: number = 200) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users?limit=${limit}`);
    return response.data.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
