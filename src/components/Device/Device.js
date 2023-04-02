import React, { useState } from "react";
import PropTypes from "prop-types";
import ControlsSwitcher from "./ControlsSwitcher/ControlsSwitcher";
import classes from "./Device.module.scss";
import Switch from "./../UI/Switch/Switch";
import { toggleAcState } from '../../services/ac.service';
import Modal from './../UI/Modal/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toggleHeaterState } from '../../services/heater.service';


const Device = (props) => {
  const { deviceId, device, onToggleDeviceSwitch, onControlValueChanged, toggleDeviceState } = props;

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(device.state === 'on');

  const onControlValueChangedHandler = (controlId, newValue) => {
    onControlValueChanged(deviceId, controlId, newValue);
  };

  const handleToggleDeviceSwitch = async () => {
    setLoading(true);
    const newState = !state;
    setState(newState);
    await props.onToggleDeviceSwitch(deviceId, newState);
    setShowModal(true);
    setLoading(false);
    // Check if the device is an AC before calling toggleAcState
    if (device.name === 'Air Conditioner' || device.name === 'ac') {
      toggleAcState(newState);
    }

    // Check if the device is a Heater before calling toggleHeaterState
    if (device.name === 'Heater' || device.name === 'heater') {
      toggleHeaterState(newState);
    }
  };


  const closeModalHandler = () => {
    setShowModal(false);
  };

  if (!device) return null;

  let deviceControls;

  if (device.controls && Object.values(device.controls).length) {
    deviceControls = Object.entries(device.controls).map(([controlId, deviceData]) => (
      <div key={controlId} className={classes.DeviceContainer}>
        <ControlsSwitcher
          controlId={controlId}
          deviceData={deviceData}
          onUpdateValue={onControlValueChangedHandler}
        />
      </div>
    ));
  }

  return (
    <div className={classes.Device}>
      <div className={classes.Header}>
        <div>{device.icon}</div>
        <div className={classes.Title}>{device.name}</div>
        <div className={classes.Switch}>
          <Switch onChange={handleToggleDeviceSwitch} checked={state} />
        </div>
      </div>
      <div>{deviceControls}</div>
      <Modal show={showModal} onCloseModal={closeModalHandler}>
        <h2>{device.name} Status</h2>
        <p>The {device.name} is {state ? "activated" : "deactivated"}.</p>
      </Modal>
      {loading && (
        <div className={classes.spinnerContainer}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

Device.propTypes = {
  deviceId: PropTypes.string,
  device: PropTypes.object,
  onToggleDeviceSwitch: PropTypes.func,
  onControlValueChanged: PropTypes.func,
};

export default Device;
