import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SERVER_URL } from "../../consts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCouch, faUtensils, faBed, faBath, faBroadcastTower, faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { faWind, faFan, faTshirt, faTemperatureHigh, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { faTint, faThermometerHalf, faRuler, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from "./HouseMap.module.scss";
import Modal from 'react-modal';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Notification } from '../Notification/Notification';
import { eventEmitter } from '../../WebSocket/ws.js';


Modal.setAppElement('#root');
const iconMapper = {
    "couch": <FontAwesomeIcon icon={faCouch} size="1x" />,
    "bread-slice": <FontAwesomeIcon icon={faUtensils} size="1x" />,
    "bed": <FontAwesomeIcon icon={faBed} size="1x" />,
    "bath": <FontAwesomeIcon icon={faBath} size="1x" />,  // map other icons...
    "utensils": <FontAwesomeIcon icon={faConciergeBell} size="1x" />,

};

const deviceIconMapper = {
    "AC": { icon: <FontAwesomeIcon icon={faWind} />, name: "AC" },
    "fan": { icon: <FontAwesomeIcon icon={faFan} />, name: "Fan" },
    "laundry": { icon: <FontAwesomeIcon icon={faTshirt} />, name: "Laundry Machine" },
    "heater": { icon: <FontAwesomeIcon icon={faTemperatureHigh} />, name: "Heater" },
    "lights": { icon: <FontAwesomeIcon icon={faLightbulb} />, name: "Lights" },
};

const sensorIconMapper = {
    "humidity": { icon: <FontAwesomeIcon icon={faTint} size="3x" />, name: "Humidity" },
    "temperature": { icon: <FontAwesomeIcon icon={faThermometerHalf} size="3x" />, name: "Temperature" },
    "distance": { icon: <FontAwesomeIcon icon={faRuler} size="3x" />, name: "Distance" },
    "moition": { icon: <FontAwesomeIcon icon={faBroadcastTower} size="3x" />, name: "Motion" },
};


const HouseMap = ({ onClose }) => {
    const [rooms, setRooms] = useState([]);
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



    return (
        <div className={styles["house-map"]}>
            <button className={styles.closeButton} onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
            {rooms.map((room) => (
                <div className={`${styles.room} ${styles[room.name.toLowerCase().replace(/\s/g, "-")]}`} key={room.id}>
                    <div className={styles.roomHeader}>
                        <h3>{room.name}</h3>
                        {iconMapper[room.icon]}
                    </div>
                    <div className={styles.devices}>
                        {room.devices.map((device, index) => (
                            deviceIconMapper[device] && (
                                <div key={index}>
                                    <p>{deviceIconMapper[device].name}</p>
                                    {deviceIconMapper[device].icon}
                                </div>
                            )
                        ))}
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
                                <div key={index}>
                                    <p>{sensor.name}</p>
                                    <FontAwesomeIcon
                                        icon={sensor.icon.props.icon}
                                        color={color}
                                        className={isActive ? styles.animatedIcon : ""}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    {room.motionDetected &&
                        <div className={styles.motionIcon}>
                            <FontAwesomeIcon icon={faUser} size="3x" color="red" className={styles.flicker} />
                        </div>
                    }


                </div>
            ))}
            <Notification showPersonIcon={showPersonIcon} hidePersonIcon={hidePersonIcon} />
        </div>
    );
};

export default HouseMap;
