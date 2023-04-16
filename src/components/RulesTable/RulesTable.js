import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Notification } from "../Notification/Notification";
import { RuleSwitch } from "../UI/Switch/RuleSwitch";
import classes from "./RulesTable.module.scss";
// import Switch from '@mui/material/Switch';
import { toast } from 'react-toastify';
import 'font-awesome/css/font-awesome.min.css';





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
  width: 130px;
`;


// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SERVER_URL = 'http://localhost:3001/rules';

const RulesTable = ({ rules }) => {

  const [currentRules, setCurrentRules] = useState(rules);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  // console.log({SERVER_URL})

  const deleteRule = async (id) => {
    try {
      const response = await axios.delete(`${SERVER_URL}/${id}`);
      if (response.status === 200) {
        const newRules = rules.filter((rule) => rule.id !== id);
        setCurrentRules(newRules);
        toast.success("Rule has been deleted.");
      }
    } catch (err) {
      console.log(err);
    }
  };

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
          {currentRules.map((rule, index) => (
            <tr key={index}>
              <ActiveCellStyled>
                <Circle color={rule.isActive ? "green" : "red"} />
              </ActiveCellStyled>
              <td>{rule.rule}</td>
              <ActionTdStyled>
                <ActionContainer>
                  <RuleSwitch isActive={rule.isActive} id={rule.id} />
                  <i
                    className="fa fa-trash"
                    onClick={() => deleteRule(rule.id)}
                    style={{ cursor: 'pointer', color: 'red', fontSize: '30px', marginRight: '8px' }}
                  ></i>
                </ActionContainer>
              </ActionTdStyled>
            </tr>
          ))}
        </tbody>
      </table>

      {alertVisible && <Notification message={alertMessage} />}
    </>
  );

};

export default RulesTable;
