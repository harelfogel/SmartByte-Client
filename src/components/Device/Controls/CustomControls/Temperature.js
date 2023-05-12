import React, { useState, useEffect } from "react";
import styled from "styled-components";


// const TemperatureContainer = styled.div`
//   display: flex;
// //   padding: 1rem;
// //   transform: translateX(-3rem);
// border: 1px solid;
// width: 10rem
// `;

const AcControlsSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.div`
  width: 50px;
  height: 50px;
  // background-color: ${(props) => props.color};
  // background-color: aqua;
  margin: 10px;
  text-align: center;
  align-items: center;
  // font-size: 22px;
  box-shadow: 0px 0px 34px rgba(59, 89, 152, 0.2);
  cursor: pointer;
`;

const TemperaturScreen = styled.div`
  width: 30px;
  height: 30px;
  text-align: center;
  align-items: center;
  display: flex;
  margin: 0.5rem;
`;


const TestButtong = styled.div`
width: 35px;
height: 19px;
margin-right: 10px;
margin-left: 10px;
margin: 0.5rem;
text-align: center;
-webkit-box-align: center;
align-items: center;
box-shadow: rgba(59, 89, 152, 0.2) 0px 0px 34px;
cursor: pointer;
border: 1px solid;
border-radius: 7px;
align-items: center;
text-align: center;
display: block;
}
`;








const TemperatureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const TemperatureButton = styled.button`
  background-color: white;
//   border: none;
  padding: 0.5rem 1rem;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  border: 1px solid;
  border-color: #f2f2f2;

  &:hover {
    background-color: #e6e6e6;
  }
`;

const TemperatureValue = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

export const Temperature = ({ temperature, onChangeValue, acState }) => {
  const [value, setValue] = useState(temperature);

  const onIncrease = () => {
    setValue(value + 1);
    onChangeValue(value + 1);
  };

  const onDecrease = () => {
    setValue(value - 1);
    onChangeValue(value - 1);
  };

  return (
    <AcControlsSection>
      <TemperatureContainer>
        <TemperatureButton onClick={onDecrease}>
          -
        </TemperatureButton>
        <TemperatureValue>
          <p>°{value}</p>
        </TemperatureValue>
        <TemperatureButton onClick={onIncrease}>
          +
        </TemperatureButton>
      </TemperatureContainer>
    </AcControlsSection>
  );
};
