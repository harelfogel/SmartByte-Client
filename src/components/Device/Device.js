import React, { useState } from "react";
import PropTypes from "prop-types";
import ControlsSwitcher from "./ControlsSwitcher/ControlsSwitcher";
import classes from "./Device.module.scss";
import Switch from "./../UI/Switch/Switch";
import { toggleAcState } from '../../services/ac.service';
import ACModal from './../ACModal/ACModal';
import CircularProgress from '@material-ui/core/CircularProgress';



const Device = (props) => {
  const { deviceId, device, onToggleDeviceSwitch, onControlValueChanged, toggleDeviceState } = props;
  
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(device.state === 'on');


  const onControlValueChangedHandler = (controlId, newValue) => {
    onControlValueChanged(deviceId, controlId, newValue);
  };

  console.log({toggleDeviceState})

  const handleToggleDeviceSwitch = async () => {
    setLoading(true);
    console.log({device})
    const newState = !state;
    setState(newState);
    await toggleDeviceState(newState);
    onToggleDeviceSwitch(deviceId, newState);
    setShowModal(true);
    setLoading(false);
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
  console.log("yovel", {device})
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
      <ACModal show={showModal} onClose={closeModalHandler} title="AC Status">
        <p>The AC is {device.state ? 'activated' : 'deactivated'}.</p>
      </ACModal>
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
