import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';

export const toggleHeaterState = async (state) => {
  console.log('----------toggleHeaterState----------')
  console.log({state})
  try {
    console.log({ state });
    const response = await axios.post(`${SERVER_URL}/heater`, { value: state });
    return response.data;
  } catch (error) {
    console.error('Error toggling heater state:', error);
  }
};
