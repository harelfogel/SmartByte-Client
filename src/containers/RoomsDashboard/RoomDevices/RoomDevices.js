import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  fetchRoomDevices,
  toggleDeviceSwitch,
  updateDeviceControlValue,
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
import _ from "lodash";
import styled from "styled-components";


const DevicesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  // padding: 10px;
  gap: 2rem;
`;

const RoomContainer = styled.div`
  padding: 30px;
`;

const NavLinkStyled = styled(NavLink)`
  color: green;
  // padding: 10rem;
`;

const DEVICED_IDS = {
  AC: '9EimtVDZ',
  LAUNDRY: '0e4be594-13bb-fe76-f092-c8dbdede80b2',
  HEATER: '061751378caab5219d31'
}

const H1 = styled.p`
  font-size: 2rem;
`;

const laundryToggle = async ({ state, id }) => {
  try {
    const response = await axios.post(`${SERVER_URL}/smartthings/toggle`, {
      state,
      deviceId: id,
    });
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

const IDS_TOGGLES_MAP = {
  [DEVICED_IDS.AC]: toggleAcState,
  [DEVICED_IDS.LAUNDRY]: laundryToggle,
  [DEVICED_IDS.HEATER]:  toggleHeater, 
};


const RoomDevices = () => {

  const [devices, setDevices] = React.useState([]);
  const [laundryDetails, setLaundryDetails] = React.useState({});
  const [room, setRoom] = useState({});
  const [roomDevices, setRoomDevices] = useState([]);

  const fetchLaundryDetails = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/laundry/details/`);
      setLaundryDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const laundryDevice = devices.find((device) => device.name === "laundry");
    if (laundryDevice) {
      fetchLaundryDetails();
    }
  }, [devices]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicesFromDB = await axios.get(`${SERVER_URL}/devices`);
        setDevices(devicesFromDB.data);
      } catch (error) {
      console.error(error);
      }
    };

    fetchData();
  }, []);

  const { id } = useParams();

  const fetchRoomData = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/rooms/${id}`);
      setRoom(response.data)
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRoomDevices = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/room-devices/${id}`);
      setRoomDevices(_.get(response, 'data.data', []));
    }
    catch(err) {
      console.error(err);
    }
  }

  

  useEffect(() => {
    fetchRoomData();
    fetchRoomDevices();
  },[])


  useEffect(() => {
    console.log("Yovel", {roomDevices})
  },[roomDevices])



  if (!devices) return null;

  return (
    <RoomContainer>
      <NavLinkStyled to="/" className={classes.BackLink}>
        <FontAwesomeIcon icon={faChevronLeft} />
        <span>Back to Rooms</span>
      </NavLinkStyled>
      <H1>{_.get(room, 'name')}</H1>
      {/* <div className={classes.RoomDevices}> */}
      <DevicesSection>
        {roomDevices.map((device) => {
          const rooms = _.get(device, "rooms", []);
          const { device_id } = device;
          return (
            <div key={device_id} className={classes.Column}>
                <NewDevice
                  device={device}
                  onToggleDeviceSwitch={IDS_TOGGLES_MAP[device_id]}
                  laundryDetails={device.name === "laundry" ? laundryDetails : null}
                />
            </div>
          );
        })}
        </DevicesSection>
      {/* </div> */}
    </RoomContainer>
  );
};

RoomDevices.propTypes = {
  fetchRoomDevices: PropTypes.func,
};

const mapStateToProps = (state) => ({
  devices: state.devices.devices,
});

const mapDispatchToProps = {
  fetchRoomDevices,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomDevices);
