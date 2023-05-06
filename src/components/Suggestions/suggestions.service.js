import axios from 'axios';
import { SERVER_URL } from '../../consts';




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

  export const addSuggestedRule = async (rule) => {
    try {
      console.log('Adding rule');
      const response = await axios.post(`${SERVER_URL}/rules`, {rule});

    }catch(error){
      console.log('Error Adding rule: ', error);
    }
  }

  export const onDeleteSuggestion = async (id, suggestions, setSuggestions) => {
    try{
      console.log('Deleting suggestion');
      await axios.delete(`${SERVER_URL}/suggestions/${id}`);
      const filteredSuggestions = suggestions.filter(suggestion => suggestion.id !== id);
      setSuggestions(filteredSuggestions);
    }catch(error){
      console.error('Error deleting suggestion: ' + error.message);
    }
  }