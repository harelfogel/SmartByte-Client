import React, { useState,useEffect } from 'react'
import styled from 'styled-components'
import { ModeControl } from './ModeControl';
import axios from 'axios';


const TemperatureContainer = styled.div`
    display: flex;
    padding: 2rem;
    transform: translateX(-3rem);
`;
const StyledButton = styled.div`
    width: 50px;
    height: 50px;
    // background-color: ${props => props.color};
    // background-color: aqua;
    margin: 10px;
    text-align: center;
    align-items: center;
    // font-size: 22px;
    box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
    cursor: pointer;
`;

const TemperaturScreen = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    align-items: center;

`;

// const DeviceContent = styled.div`
// // padding: 0.1rem 2rem 0;
// width: 20px;
// height: 20px;
// // background-color: ${props => props.color};
// background-color: aqua;

// `;

const SERVER_URL='http://localhost:3001';


export const Temperature = ({temperature, onChangeValue}) => {
  const [value, setValue] = useState(temperature);
  const [mode, setMode] = useState('cool');
  const [loading, setLoading] = useState(true);

  const fetchCurrentMode = async () => {
      try {
          const response = await axios.get(`${SERVER_URL}/sensibo`);
          console.log({response})
          const currentMode = response.data.state.mode;
          setMode(currentMode);
          setLoading(false);
      } catch (error) {
          console.error('Error fetching current mode:', error);
          setLoading(false);
      }
  };

  useEffect(() => {
      fetchCurrentMode();
  }, []);

  const updateMode = async (newMode) => {
      try {
          const deviceId = '9EimtVDZ'; 
          const response = await axios.post(`${SERVER_URL}/sensibo/mode`, { deviceId, mode: newMode });
          console.log('Mode updated successfully:', response.data);
      } catch (error) {
          console.error('Error updating mode:', error);
      }
  };

  const onModeChange = async (newMode) => {
      setMode(newMode);
      await updateMode(newMode);
  };

  const onIncrease = () => {
      setValue(value + 1);
      onChangeValue(value + 1);
  };

  const onDecrease = () => {
      setValue(value - 1);
      onChangeValue(value - 1);
  };

  return (
      <TemperatureContainer>
          <StyledButton onClick={onDecrease}>
              <p>-</p>
          </StyledButton>
          <TemperaturScreen>
              <p>°{value}</p>
          </TemperaturScreen>
          <StyledButton onClick={onIncrease}>
              <p>+</p>
          </StyledButton>
          {loading ? (
              <p>Loading mode...</p>
          ) : (
              <ModeControl mode={mode} onModeChange={onModeChange} />
          )}
      </TemperatureContainer>
  );
}
