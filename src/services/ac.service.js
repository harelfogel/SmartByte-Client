import axios from 'axios';

const SERVER_URL = 'https://smartbytealpha.onrender.com';

export const toggleAcState = async (state) => {
  try {
    const response = await axios.post(`${SERVER_URL}/sensibo`, { state });
    return response.data;
  } catch (error) {
    console.error('Error toggling AC state:', error);
  }
};
