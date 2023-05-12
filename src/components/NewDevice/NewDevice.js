// import Switch from '@mui/material/Switch';
// import { Button, CircularProgress, Snackbar, MuiAlert } from '@material-ui/core';
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Temperature } from "../Device/Controls/CustomControls/Temperature";
import { SnackBar } from "../Snackbar/SnackBar";
import Switch from "../UI/Switch/Switch";
import ModeControl from "../Device/Controls/Mode/ModeControl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWater, faThermometerHalf, faSpinner,faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { MenuItem, Select } from '@material-ui/core';
import axios from 'axios';
import { SERVER_URL } from "../../consts";


const DeviceContainer = styled.div`
  // width: 90%;
  height: auto;
  // background-color: green;
  // border: 1px solid;
  min-height: 10rem;
  box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
  // margin: 2rem;
  // padding-left: 1rem;
  // padding-right: 1rem;
  padding: 0.1rem 2rem 0;
  display: flex;
  flex-direction: column;
  width: 90%;
  height: auto;
  min-height: 10rem;
  box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
  padding: 0.1rem 2rem 0;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
`;

const StyledSwitch = styled(Switch)`
  && {
    color: blue;

    &:hover {
      background-color: green;
    }

    &.Mui-checked {
      color: blue;
    }

    &.Mui-checked:hover {
      background-color: yellow;
    }
  }
`;

export const NewDevice = ({ device, onToggleDeviceSwitch }) => {
  const [state, setState] = useState(device.state === "on");
  const [temperature, setTemperature] = useState(24);
  const [openSeccessSnackBar, setOpenSuccessSnackbar] = useState(false);
  const [openFailureSnackBar, setOpenFailureSnackbar] = useState(false);
  const [currentLaundryDetails, setCurrentLaundryDetails] = useState(null);
  
  const { name } = device;

  const isAcDevice = name === "ac";
  const isHeaterDevice = name === "heater";
  const isLaundryDevice = name === "laundry";

  const onUpdateModeValueHandler = (controlId, updatedMode) => {
    // Update the AC mode by sending a request to your Node.js server.
    // Replace this with the actual API call to your server.
    console.log(`Updated mode for device ${controlId}: ${updatedMode}`);
  };


  const onDeviceChange = async (e) => {
    const newState = e.target.checked;
    setState(newState);
    const response = await onToggleDeviceSwitch({
      state: newState,
      id: device.id,
      temperature,
    });
    console.log(response);
    if (response.statusCode === 200) {
      setOpenSuccessSnackbar(true);
    } else {
      setOpenFailureSnackbar(true);
    }
  };

  useEffect(() => {
    const fetchLaundryDetails = async () => {
      try {
        const response = await axios.get(`${SERVER_URL}/laundry/details`);
        const data = await response.data;
        data.spin = data.spin === 0 ? "No spin" : `${data.spin} rpm`; 
        setCurrentLaundryDetails(data);
      } catch (error) {
        console.error("Failed to fetch laundry details:", error);
      }
    };
  
    if (isLaundryDevice) {
      fetchLaundryDetails();
    }
  }, [isLaundryDevice]);
  
  

  const updateLaundryDetails = (key, value) => {
    const updatedDetails = { ...currentLaundryDetails, [key]: value };
    setCurrentLaundryDetails({ ...currentLaundryDetails, [key]: value });
    updateLaundryDetailsServer(updatedDetails);

  };

  const updateLaundryDetailsServer = async (updatedDetails) => {
    try {
      const response = await axios.post(`${SERVER_URL}/laundry/update`, updatedDetails);
      console.log("Updated laundry details on the server: ", response.data);
    } catch (error) {
      console.error("Failed to update laundry details on the server:", error);
    }
  };
  
  
  
  const renderLaundryControls = () => {
    if (isLaundryDevice  && currentLaundryDetails) {
      const temperatureOptions = [20, 30, 40, 60, 90];
      const rinseOptions = [1, 2, 3, 4, 5];
      const spinOptions = [
        "No spin",
        "Rinse Hold",
        "400 rpm",
        "800 rpm",
        "1000 rpm",
        "1200 rpm",
        "1400 rpm",
      ];
      
      
  
      return (
        <div style={{ display: 'flex', alignItems: 'flex-start' , marginTop:'-2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginRight: '1rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Rinse:</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faWater} size="2x" />
              <Select
                value={currentLaundryDetails.rinse}
                onChange={(e) => updateLaundryDetails("rinse", e.target.value)}
              >
                {rinseOptions.map((rinse) => (
                  <MenuItem value={rinse} key={rinse}>
                    {rinse} time{rinse > 1 ? "s" : ""}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', margin: '1 1rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Temperature:</p>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <FontAwesomeIcon icon={faThermometerHalf} size="2x" />
              <Select
                value={currentLaundryDetails.temperature}
                onChange={(e) =>
                  updateLaundryDetails("temperature", e.target.value)
                }
              >
                {temperatureOptions.map((temp) => (
                  <MenuItem value={temp} key={temp}>
                    {temp}°C
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '1rem' }}>
            <p style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>Spin:</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FontAwesomeIcon icon={faCircleNotch} size="2x" />
              <Select
                value={currentLaundryDetails.spin}
                onChange={(e) => updateLaundryDetails("spin", e.target.value)}
              >
                {spinOptions.map((spin) => (
                  <MenuItem value={spin} key={spin}>
                    {spin}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>
      );
    }
  };


  const renderModeControl = () => {
    if (isAcDevice) {
      return (
        <ModeControl
          controlId={device.id}
          name={device.name}
          value={device.mode}
          onUpdateValue={onUpdateModeValueHandler}
          options={device.modes}
        />
      );
    }
  };



  const onChangeTemperature = (value) => {
    setTemperature(value);
  }

  const handleCloseSnackBar = () => {
    setOpenSuccessSnackbar(false);
  }

  return (
    <DeviceContainer>
      <TopRow>
        <h2>{name}</h2>
        <Switch onChange={(e) => onDeviceChange(e)} checked={state} />
      </TopRow>
      <Controls>
        {isAcDevice && <Temperature temperature={24} onChangeValue={(value) => onChangeTemperature(value)} />}
        {renderModeControl()}
        {renderLaundryControls()}
      </Controls>
      {openSeccessSnackBar && (
        <SnackBar
          message={`${device.name.toUpperCase()} is now ${state ? "ON" : "OFF"}`}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="green"
        />
      )}
      {openFailureSnackBar && (
        <SnackBar
          message={`Unable to turn ${
            state ? "ON" : "OFF"
          } ${device.name.toUpperCase()}`}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="red"
        />
      )}
    </DeviceContainer>
  );
};
