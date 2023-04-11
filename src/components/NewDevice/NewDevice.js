// import Switch from '@mui/material/Switch';
import { Button, CircularProgress, Snackbar, MuiAlert } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Temperature } from '../Device/Controls/CustomControls/Temperature';
import Switch from '../UI/Switch/Switch';


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




export const NewDevice = ({
    device,
    onToggleDeviceSwitch
}) => {
    const [state, setState] = useState(device.state === 'on');
    const [temperature, setTemperature] = useState(24);
    const [open,setOpen] = useState(false);
    const {name} = device;


    const isAcDevice = device.name === 'ac';
    const isHeaterDevice = device.name === 'heater';
    const isLaundryDevice = device.name === 'laundry';

    const onDeviceChange = async (e) => {
        const newState = e.target.checked;
        setState(newState);
        const response = await onToggleDeviceSwitch({
            state: newState,
            temperature
        });
        if(response.statusCode === 200){
            setOpen(true);
        }

    }

    const onButtonClick = () => {
        setOpen(!open);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const onChangeTemperature = (value) => {
        setTemperature(value);
    }

  return (
    <DeviceContainer>
        <h2>{name}</h2>
        <Switch onChange={(e) => onDeviceChange(e)} checked={state} />
        {isAcDevice && <Temperature temperature={24} onChangeValue={(value) => onChangeTemperature(value)} />}
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="AC switched"
                ContentProps={{
                    style: { backgroundColor: '#2fa324', color: '#fff' }, // set the background and text color
                }}
            />
        </div>
    </DeviceContainer>
  )
}
