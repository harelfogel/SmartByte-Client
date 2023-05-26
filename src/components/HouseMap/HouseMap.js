import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ROOMS_IDS, SERVER_URL } from "../../consts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faUtensils, faBed, faBath, faBroadcastTower, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { faWind, faFan, faTshirt, faTemperatureHigh, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faTint, faThermometerHalf, faRuler, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from "./HouseMap.module.scss";
import Modal from 'react-modal';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Notification } from '../Notification/Notification';
import { eventEmitter } from '../../WebSocket/ws.js';
import _ from 'lodash';

Modal.setAppElement('#root');
const iconMapper = {
    "couch": <FontAwesomeIcon icon={faCouch} size="1x" />,
    "bread-slice": <FontAwesomeIcon icon={faUtensils} size="1x" />,
    "bed": <FontAwesomeIcon icon={faBed} size="1x" />,
    "bath": <FontAwesomeIcon icon={faBath} size="1x" />,  // map other icons...
    "utensils": <FontAwesomeIcon icon={faConciergeBell} size="1x" />,

};

const deviceIconMapper = {
    "AC": { icon: <FontAwesomeIcon   icon={faWind} />, name: "AC" },
    "fan": { icon: <FontAwesomeIcon icon={faFan} />, name: "Fan" },
    "laundry": { icon: <FontAwesomeIcon icon={faTshirt} />, name: "Laundry Machine" },
    "heater": { icon: <FontAwesomeIcon icon={faTemperatureHigh} />, name: "Heater" },
    "lights": { icon: <FontAwesomeIcon icon={faLightbulb} />, name: "Lights" },
};

const deviceONIconMapper = {
    "AC": { icon: <FontAwesomeIcon color='blue' className={styles.animatedIcon}  icon={faWind} />, name: "AC" },
    "fan": { icon: <FontAwesomeIcon color='green' className={styles.animatedIcon} icon={faFan} />, name: "Fan" },
    "laundry": { icon: <FontAwesomeIcon color='purple' className={styles.animatedIcon} icon={faTshirt} />, name: "Laundry Machine" },
    "heater": { icon: <FontAwesomeIcon color='red' className={styles.animatedIcon} icon={faTemperatureHigh} />, name: "Heater" },
    "lights": { icon: <FontAwesomeIcon color='orange' className={styles.animatedIcon} icon={faLightbulb} />, name: "Lights" },
};

const sensorIconMapper = {
    "humidity": { icon: <FontAwesomeIcon icon={faTint} size="3x" />, name: "Humidity" },
    "temperature": { icon: <FontAwesomeIcon icon={faThermometerHalf} size="3x" />, name: "Temperature" },
    "distance": { icon: <FontAwesomeIcon icon={faRuler} size="3x" />, name: "Distance" },
    "moition": { icon: <FontAwesomeIcon icon={faBroadcastTower} size="3x" />, name: "Motion" },
};

const Item = ({ device, map }) => {
    console.log("Yovel", device);
    const {device_name, state} = device;
    const deviceIcon = state === 'off' ?  map[device_name] : deviceONIconMapper[device_name];
    return (
      <div style={{ display: 'flex', alignItems: 'center', height: '20px' }}>
        {_.get(deviceIcon,'icon')}
        <p style={{ marginLeft: '10px' }}>{_.get(deviceIcon,'name')}</p>
      </div>
    );
  };
  

const ItemsList = ({devices, map}) => {
    return (
        devices.map(device => {
           return <Item device={device} map={map} />
        })
    )
}

const HouseMap = ({ onClose }) => {
    const [rooms, setRooms] = useState([]);
    const [roomsWithDevices, setRoomsWithDevices] = useState([]);
    const [sensors, setSensors] = useState([]);

    useEffect(() => {
        const getRooms = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/rooms`);
                const roomsWithMotion = response.data.map(room => ({
                    ...room,
                    motionDetected: false,
                }));
                setRooms(roomsWithMotion);
            } catch (err) {
                console.log("There was a problem fetching room data:", err);

            }
        };

        const getSensors = async () => {
            const response = await axios.get(`${SERVER_URL}/sensors`);
            setSensors(response.data);
        };

        getRooms();
        getSensors();
    }, []);

    useEffect(() => {
        const handleMotionDetected = (roomId) => {
            showPersonIcon(roomId);
        };

        eventEmitter.on('motionDetected', handleMotionDetected);

        return () => {
            eventEmitter.off('motionDetected', handleMotionDetected);
        };
    }, [rooms]);

    const showPersonIcon = (roomId) => {
        console.log(`Motion detected in room: ${roomId}`);
        setRooms(currentRooms => {
            const newRooms = currentRooms.map(room => {
                if (room._id === roomId) {
                    return { ...room, motionDetected: true };
                } else {
                    return { ...room, motionDetected: false };
                }
            });
            return newRooms;
        });
    };


    const hidePersonIcon = (roomId) => {
        setRooms(currentRooms => currentRooms.map(room => {
            if (room.id === roomId) {
                return { ...room, motionDetected: false };
            }
            return room;
        }));
    };


    const getSensorActivationStatus = (sensorId) => {
        const sensor = sensors.find(s => s._id === sensorId);
        if (sensor) {
            return sensor.activated;
        }
        return "off";
    };

    const handleMotionDetected = (roomId) => {
        console.log(`Event 'motionDetected' received with roomId: ${roomId}`);

        showPersonIcon(roomId);
    };
    // useEffect block to listen to 'motionDetected' events
    useEffect(() => {
        eventEmitter.on('motionDetected', handleMotionDetected);

        return () => {
            eventEmitter.off('motionDetected', handleMotionDetected);
        };
    }, [rooms]);

    // const getRoomDevices = async (roomId) => {
    //     const response = await axios.get(`${SERVER_URL}/room-devices/${roomId}`);
    //     return response.data;
    // }   



    useEffect(() => {

    
        const getRoomDevices = async (roomId) => {
            const devicesResponse = await axios.get(`${SERVER_URL}/devices`);
            const devices = devicesResponse.data;
            const devicesMap = devices.reduce((acc, device) => {
                acc[device.device_id] = device.name;
                return acc;
            },{})
           const kitchenDevicesResponse = await axios.get(`${SERVER_URL}/room-devices/${ROOMS_IDS.KITCHEN}`);
           const livingRoomDevicesResponse = await axios.get(`${SERVER_URL}/room-devices/${ROOMS_IDS.LIVING_ROOM}`);
           const bathroomDevicesResponse = await axios.get(`${SERVER_URL}/room-devices/${ROOMS_IDS.BATHROOM}`);
           const diningRoomDevicesResponse = await axios.get(`${SERVER_URL}/room-devices/${ROOMS_IDS.DINING_ROOM}`);
           const bedroomDevicesResponse = await axios.get(`${SERVER_URL}/room-devices/${ROOMS_IDS.BEDROOM}`);

            const kitchenDevices = kitchenDevicesResponse.data.data;
            const livingRoomDevices = livingRoomDevicesResponse.data.data;
            const bathroomDevices = bathroomDevicesResponse.data.data;
            const diningRoomDevices = diningRoomDevicesResponse.data.data;
            const bedroomDevices = bedroomDevicesResponse.data.data;

            
           const roomDevicesMap = {
            [ROOMS_IDS.KITCHEN]: kitchenDevices,
            [ROOMS_IDS.LIVING_ROOM]: livingRoomDevices,
            [ROOMS_IDS.BATHROOM]: bathroomDevices,
            [ROOMS_IDS.DINING_ROOM]: diningRoomDevices,
            [ROOMS_IDS.BEDROOM]: bedroomDevices
           }

           const roomsWithDevices = rooms.map(room => {
            return {...room, actualDevices: roomDevicesMap[room.id]}
           })

           console.log("Yovel", roomsWithDevices)

           setRoomsWithDevices(roomsWithDevices);

        }
        getRoomDevices();

    },[rooms])




    return (
        <div className={styles["house-map"]}>
            <button className={styles.closeButton} onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {

            roomsWithDevices.map((room) => {
                return <div className={`${styles.room} ${styles[room.name.toLowerCase().replace(/\s/g, "-")]}`} key={room.id}>
                    
                    <div className={styles.roomHeader}>
                        <p style={{marginRight:'10px', marginLeft: '10px', fontSize: '20px'}}>{room.name}</p>
                        {iconMapper[room.icon]}
                    </div>
                    <div className={styles.devices}>
                        <ItemsList devices={room.actualDevices} map={deviceIconMapper} />
                    </div>
                    <div className={styles.sensors}>
                        {Object.entries(room.sensors).map(([sensorId, sensorName], index) => {
                            const sensor = sensorIconMapper[sensorName];
                            if (!sensor) {
                                return null;
                            }
                            const isActive = getSensorActivationStatus(sensorId) === "on";
                            const color = isActive ? "green" : "red";

                            return (
                                <div key={index} style={{display: 'flex', alignItems: 'center', height: '30px'}}>
                                    <FontAwesomeIcon
                                        icon={sensor.icon.props.icon}
                                        color={color}
                                        className={isActive ? styles.animatedIcon : ""}
                                        />
                                        <p style={{marginRight: '10px', marginLeft: '10px'}}>{sensor.name}</p>
                                </div>
                            );
                        })}
                    </div>
                    {room.motionDetected &&
                        <div className={styles.motionIcon}>
                            <FontAwesomeIcon icon={faUser} size="2x" color="red" className={styles.flicker} />
                        </div>
                    }


                </div>
})}
            <Notification showPersonIcon={showPersonIcon} hidePersonIcon={hidePersonIcon} />
        </div>
    );
};

export default HouseMap;
