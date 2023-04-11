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
import axios from "axios";
import { toggleAcState } from "../../../services/ac.service";
import { NewDevice } from "../../../components/NewDevice/NewDevice";

const DEVICED_IDS = {
  AC: '9EimtVDZ',
  LAUNDRY: '21081111RG',
  HEATER: '061751378caab5219d31'
}

const SERVER_URL = 'http://localhost:3001';

const laundryToggle = async () => {
  console.log('laundry toggled')
}
const heaterToggle = async () => {
  console.log('heater toggled')
}
const IDS_TOGGLES_MAP = {
  [DEVICED_IDS.AC]: toggleAcState,
  [DEVICED_IDS.LAUNDRY]: laundryToggle,
  [DEVICED_IDS.HEATER]: heaterToggle
}
const RoomDevices = ({
  // devices,
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue
}) => {

  const [devices, setDevices] = React.useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesFromDB = await axios.get(`${SERVER_URL}/devices`);
        setDevices(devicesFromDB.data);
        // console.log(devicesFromDB)
      } catch (error) { }
    };

    fetchData();
  }, []);

  console.log({devices})

  useEffect(() => {
  }, [devices])


  const { id } = useParams();

  useEffect(() => {
    if (!!fetchRoomDevices) {
      fetchRoomDevices(id);
    }
  }, [fetchRoomDevices, id]);

  /**
   * This for toggling the main switch of the device
   */
  const handleToggleDeviceSwitch = async (deviceId, state) => {
    await IDS_TOGGLES_MAP[deviceId](state);
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
        {devices.map(device => {
          const { device_id } = device;
          console.log({ device })
          return <div key={device_id} className={classes.Column}>
            {/* <Device
              deviceId={device_id}
              device={device}
              onToggleDeviceSwitch={() => handleToggleDeviceSwitch(device_id)}
              onControlValueChanged={(controlId, newValue) =>
                handleControlValueChanged(device_id, controlId, newValue)
              }
              toggleDeviceState={IDS_TOGGLES_MAP[device_id]}
            /> */}
            <NewDevice 
              device={device}
              onToggleDeviceSwitch={IDS_TOGGLES_MAP[device_id]}
            />
          </div>
        })}
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
