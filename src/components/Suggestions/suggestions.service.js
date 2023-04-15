import axios from 'axios';

const SERVER_URL = 'http://localhost:3001';

const temperatureMap = {
    1: 15,
    2: 20,
    3: 27,
    4: 35
}

export const generateRule = (suggestion) => {
    const { device, evidence, state } = suggestion;
    const isAcDevice = device.toLowerCase() === 'ac';
    const conditions = Object.entries(evidence).map(condition => {
        const [key, value] = condition;
        return `${key} < ${temperatureMap[value]}`;
    }).join(' AND ');

    const action = `("${device} ${state}")`;

    const generatedRule = `IF ${conditions} THEN TURN${action}`;
    console.log({ generatedRule })
    return generatedRule;

}  

export const getSuggestions = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/suggestions`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };


  export const updateSuggestions = async () => {
    try{
      const response = await axios.put(`${SERVER_URL}/suggestions`,{
        is_new: false
      });
      
    }catch(error){
      console.log('Error updating suggestions:', error);
    }
  }