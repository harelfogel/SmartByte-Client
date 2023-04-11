import React, { useState } from 'react'
import styled from 'styled-components'



const TemperatureContainer = styled.div`
    display: flex;
    padding: 10px;
`;

const StyledButton = styled.div`
    width: 50px;
    height: 50px;
    // background-color: ${props => props.color};
    // background-color: aqua;
    margin: 10px;
    text-align: center;
    align-items: center;
    // font-size: 22px;
    box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
    cursor: pointer;
`;

const TemperaturScreen = styled.div`
    width: 50px;
    height: 50px;
    text-align: center;
    align-items: center;

`;

// const DeviceContent = styled.div`
// // padding: 0.1rem 2rem 0;
// width: 20px;
// height: 20px;
// // background-color: ${props => props.color};
// background-color: aqua;

// `;




export const Temperature = ({temperature, onChangeValue}) => {

    const [value, setValue] = useState(temperature);

    const onIncrease = () => {
        setValue(value + 1);
        onChangeValue(value + 1);

    }
    const onDecrease = () => {
        setValue(value - 1);
        onChangeValue(value - 1);
    }



  return (
    
    <TemperatureContainer>
        <StyledButton onClick={onDecrease}>
            <p>-</p>
        </StyledButton>
        <TemperaturScreen>
            <p>{value}</p>
        </TemperaturScreen>
        <StyledButton onClick={onIncrease}>
            <p>+</p>
        </StyledButton>
    </TemperatureContainer>
  )
}
