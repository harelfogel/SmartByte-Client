import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import styles from './Spinner.module.scss';


const HouseMapLoading = ({ isLoading, children }) => {
    return (
        <div className={`house-map-loading ${isLoading ? 'is-loading' : ''}`}>
            <div className="house-map-spinner">
                <FontAwesomeIcon icon={faCircleNotch} spin size="3x" color="white" />
            </div>
            {children}
        </div>
    );
};


export default HouseMapLoading;