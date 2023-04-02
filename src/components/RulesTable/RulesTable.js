import React from "react";
import styled from "styled-components";
import { RuleSwitch } from "../UI/Switch/RuleSwitch";
import Switch from "../UI/Switch/Switch";
import classes from "./RulesTable.module.scss";
// import Switch from '@mui/material/Switch';


const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => props.color};
  border-radius: 50%;
  margin: 0 auto;
`;

const ActiveCellStyled = styled.td`
  width: 3px;
  align-items: center;
  justify-content: center;
`;


// const label = { inputProps: { 'aria-label': 'Switch demo' } };


const RulesTable = ({ rules }) => {
  console.log({rules})
  return (
    <>
      <table className={classes.RulesTable}>
        <thead>
          <tr>
            <th>Active</th>
            <th>Rule</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((rule, index) => (
            <tr key={index}>
              <ActiveCellStyled><Circle color={rule.isActive ? 'green' : 'red'}/></ActiveCellStyled>
              <td>{rule.rule}</td>
              <td><RuleSwitch isActive={rule.isActive} id={rule.id} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RulesTable;
