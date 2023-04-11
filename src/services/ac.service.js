import axios from 'axios';

// const SERVER_URL = 'https://smartbytealpha.onrender.com';
const SERVER_URL = 'http://localhost:3001';

export const toggleAcState = async (props) => {
  console.log('----------toggleAcState----------')
  const {state, temperature} = props;
  try {
    console.log({state, temperature});
    const response = await axios.post(`${SERVER_URL}/sensibo`, { state, temperature });
    return response.data;
  } catch (error) {
    console.error('Error toggling AC state:', error);
  }
};
