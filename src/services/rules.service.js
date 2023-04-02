import axios from "axios";

export const fetchRules = async () => {
  try {
    const response = await axios.get("http://localhost:3001/rules");
    return response.data;
  } catch (error) {
    console.error("Error fetching rules:", error);
    return [];
  }
};
