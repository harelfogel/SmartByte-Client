import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue
} from "./../../../store/devices/devices.actions";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";

import classes from "./RoomDevices.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { toggleAcState } from "../../../services/ac.service";
import { NewDevice } from "../../../components/NewDevice/NewDevice";
import { SERVER_URL } from "../../../consts";




export const RoomDevicesWrapper = () => {
  const {id} = useParams();
  return <RoomDevices id={id} />;
}


const DEVICED_IDS = {
  AC: '9EimtVDZ',
  LAUNDRY: '21081111RG',
  HEATER: '061751378caab5219d31'
}

const laundryToggle = async ({state, id}) => {
  try {
    const response = await axios.post(`${SERVER_URL}/smartthings/toggle`, { state, deviceId: id });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


const toggleHeater = async (value) => {
  try {
    const response = await axios.post(`${SERVER_URL}/heater`, { value });
    return response;
  } catch (error) {
    console.error(error);
  }
};

const heaterToggle = async (newHeaterState) => {
  console.log('heater toggled');
  return await toggleHeater(newHeaterState);
}

const IDS_TOGGLES_MAP = {
  [DEVICED_IDS.AC]: toggleAcState,
  [DEVICED_IDS.LAUNDRY]:laundryToggle,
  [DEVICED_IDS.HEATER]: heaterToggle,
};

const RoomDevices = ({
  fetchRoomDevices
}) => {

  const [devices, setDevices] = React.useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesFromDB = await axios.get(`${SERVER_URL}/devices`);
        setDevices(devicesFromDB.data);
      } catch (error) { }
    };

    fetchData();
  }, []);

  useEffect(() => {
  }, [devices]);

  const { id } = useParams();

  useEffect(() => {
    if (!!fetchRoomDevices) {
      fetchRoomDevices(id);
    }
  }, [fetchRoomDevices, id]);

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
          return <div key={device_id} className={classes.Column}>
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
  fetchRoomDevices: PropTypes.func,
};

const mapStateToProps = state => ({
  devices: state.devices.devices
});

const mapDispatchToProps = {
  fetchRoomDevices,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomDevices);
