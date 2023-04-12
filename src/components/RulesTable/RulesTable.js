import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Notification } from "../Notification/Notification";
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

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ActionTdStyled = styled.td`
  width: 200px;
`;


// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SERVER_URL = 'http://localhost:3001/rules';

const RulesTable = ({ rules }) => {
  // console.log({SERVER_URL})
  const deleteRule = (id) => {
    const newRules = rules.filter(rule => rule.id!== id);
    setCurrentRules(newRules);
    console.log(id);
    const response = axios.delete(`${SERVER_URL}/${id}`)
    .then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })

  };

  const [currentRules, setCurrentRules] = useState(rules);
  console.log({currentRules})
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
              <ActionTdStyled>
                <ActionContainer>
                  <RuleSwitch isActive={rule.isActive} id={rule.id} />
                  <Button onClick={() => deleteRule(rule.id)} variant="outlined">DELETE</Button>
                </ActionContainer>
              </ActionTdStyled>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <Notification /> */}
    </>
  );
};

export default RulesTable;
