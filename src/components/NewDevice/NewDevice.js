// import Switch from '@mui/material/Switch';
// import { Button, CircularProgress, Snackbar, MuiAlert } from '@material-ui/core';
import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Temperature } from "../Device/Controls/CustomControls/Temperature";
import { SnackBar } from "../Snackbar/SnackBar";
import Switch from "../UI/Switch/Switch";
import ModeControl from "../Device/Controls/Mode/ModeControl";

const DeviceContainer = styled.div`
  width: 90%;
  height: auto;
  // background-color: green;
  // border: 1px solid;
  min-height: 10rem;
  box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
  // margin: 2rem;
  // padding-left: 1rem;
  // padding-right: 1rem;
  padding: 0.1rem 2rem 0;
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

  const { name } = device;

  const isAcDevice = name === "ac";
  const isHeaterDevice = name === "heater";
  const isLaundryDevice = name === "laundry";

  const onUpdateModeValueHandler = (controlId, updatedMode) => {
    // Update the AC mode by sending a request to your Node.js server.
    // Replace this with the actual API call to your server.
    console.log(`Updated mode for device ${controlId}: ${updatedMode}`);
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

  const onDeviceChange = async (e) => {
    const newState = e.target.checked;
    setState(newState);
    console.log("Yovel", { newState });
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

  const onChangeTemperature = (value) => {
    setTemperature(value);
  };

  const handleCloseSnackBar = () => {
    setOpenSuccessSnackbar(false);
  };

  return (
    <DeviceContainer>
      <h2>{name}</h2>
      <Switch onChange={(e) => onDeviceChange(e)} checked={state} />
      {isAcDevice && (
        <Temperature
          temperature={24}
          onChangeValue={(value) => onChangeTemperature(value)}
        />
      )}
      {renderModeControl()}
      {openSeccessSnackBar && (
        <SnackBar
          message={`${device.name.toUpperCase()} is now ${
            state ? "ON" : "OFF"
          }`}
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
