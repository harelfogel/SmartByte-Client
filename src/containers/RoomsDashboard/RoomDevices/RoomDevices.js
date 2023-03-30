import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue
} from "./../../../store/devices/devices.actions";
import Device from "./../../../components/Device/Device";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";

import classes from "./RoomDevices.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const RoomDevices = ({
  devices,
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue
}) => {
  const { id } = useParams();

  useEffect(() => {
    if (!!fetchRoomDevices) {
      fetchRoomDevices(id);
    }
  }, [fetchRoomDevices, id]);

  /**
   * This for toggling the main switch of the device
   */
  const handleToggleDeviceSwitch = (deviceId) => {
    toggleDeviceSwitch(deviceId);
  };

  /**
   * Event handler when a device control value changed
   */
  const handleControlValueChanged = (deviceId, controlId, newValue) => {
    updateDeviceControlValue({ deviceId, controlId, newValue });
  };

  if (!devices) return null;

  return (
    <>
      <NavLink to="/" className={classes.BackLink}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Back to Rooms</span>
      </NavLink>
      <div className={classes.RoomDevices}>
        {Object.entries(devices).map(([deviceId, deviceData]) => (
          <div key={deviceId} className={classes.Column}>
            <Device
              deviceId={deviceId}
              device={deviceData}
              onToggleDeviceSwitch={() => handleToggleDeviceSwitch(deviceId)}
              onControlValueChanged={(controlId, newValue) =>
                handleControlValueChanged(deviceId, controlId, newValue)
              }
            />
          </div>
        ))}
      </div>
    </>
  );
};

RoomDevices.propTypes = {
  devices: PropTypes.object,
  fetchRoomDevices: PropTypes.func,
  toggleDeviceSwitch: PropTypes.func,
  updateDeviceControlValue: PropTypes.func
};

const mapStateToProps = state => ({
  devices: state.devices.devices
});

const mapDispatchToProps = {
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDevices);
