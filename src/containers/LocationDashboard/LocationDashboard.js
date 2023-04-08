import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './LocationDashboard.module.scss';

// const SERVER_URL = 'https://smartbytealpha.onrender.com';
const SERVER_URL = 'http://localhost:3001'
// console.log(process.env.REACT_APP_SERVER_URL);

const LocationDashboard = () => {
    const [location, setLocation] = useState({ lat: null, lng: null, accuracy: null });
    const [distance, setDistance] = useState(0);


    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            position => {
                const { latitude, longitude, accuracy } = position.coords;
                setLocation({ lat: latitude, lng: longitude, accuracy: accuracy });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const getDistance = async () => {
            try {
                if (location.lat != null && location.lng != null) {
                    const response = await axios.post(`${SERVER_URL}/location`, {
                        location
                    });
                    setDistance(response.data.distance);
                }

            }catch(err){
                console.log(err)
            }
        };
        getDistance();
    }, [location]);
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.headline}>Location</h1>
            <div className={styles.container}>
                <p className={styles['location-info']}>latitude: {location.lat}</p>
                <p className={styles['location-info']}>longitude: {location.lng}</p>
                <p className={styles['location-info']}>accuracy: {location.accuracy}</p>
                <p className={styles['location-info']}>distance: {distance}</p>
            </div>
        </div>
    );
};

export default LocationDashboard;
