import React from "react";
import PropTypes from "prop-types";
import ControlsSwitcher from "./ControlsSwitcher/ControlsSwitcher";
import classes from "./Device.module.scss";
import Switch from "./../UI/Switch/Switch";

const Device = (props) => {
  const { deviceId, device, onToggleDeviceSwitch, onControlValueChanged } = props;

  const onControlValueChangedHandler = (controlId, newValue) => {
    onControlValueChanged(deviceId, controlId, newValue);
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
          <Switch onChange={onToggleDeviceSwitch} checked={device.switch} />
        </div>
      </div>
      <div>{deviceControls}</div>
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
