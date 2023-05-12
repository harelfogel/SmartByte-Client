import React from "react";
import styled from "styled-components";
import { ModeControl } from "./ModeControl";
import { Temperature } from "./Temperature";

const DeviceContainer = styled.div`
  width: 18rem;
  height: 12rem;
  background-color: white;
  border: 1px solid;
  // margin: 1rem;
  padding: 1rem;
  border-radius: 10px;
  border-color: #e4e6eb;
`;

const Card = styled.div`
  width: 18rem;
  height: 14rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 1rem;
`;

export const AcControls = ({ temperature, onChangeValue, acState }) => {
  return (
    <>
      <Temperature
        temperature={temperature}
        onChangeValue={onChangeValue}
        acState={acState}
      />
      <ModeControl acState={acState}/>
    </>
  );
};
