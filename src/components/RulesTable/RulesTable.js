import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Notification } from "../Notification/Notification";
import { RuleSwitch } from "../UI/Switch/RuleSwitch";
import classes from "./RulesTable.module.scss";
// import Switch from '@mui/material/Switch';
import { toast } from "react-toastify";
import "font-awesome/css/font-awesome.min.css";
import { updateRule } from "../../services/rules.service";
import { SnackBar } from "../Snackbar/SnackBar";
import EditIcon from "@material-ui/icons/Edit";

const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color};
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

const RuleCell = styled.td`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RuleInput = styled.input`
  display: ${(props) => (props.editing ? "block" : "none")};
  width: 80%;
  height: 30px;
  border-radius: 30px;
  border-style: solid;
  // border-width: 0.9px
  padding-left: 30px;
  // border-color: gray;
  // position: absolute;
  // top: 0;
  // left: 0;
`;

const RuleText = styled.div`
  display: ${(props) => (props.editing ? "none" : "block")};
`;

// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SERVER_URL = "http://localhost:3001/rules";

const RulesTable = ({ rules, onRuleClick, selectedRule }) => {
  const [currentRules, setCurrentRules] = useState(rules);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [editedRule, setEditedRule] = useState(null);
  const [openSeccessSnackBar, setOpenSuccessSnackbar] = useState(false);
  const [openFailureSnackBar, setOpenFailureSnackbar] = useState(false);

  // console.log({SERVER_URL})

  const handleCloseSnackBar = () => {
    setOpenSuccessSnackbar(false);
    setOpenFailureSnackbar(false);
  };

  useEffect(() => {
    console.log({ currentRules });
  }, [currentRules]);

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
            <tr
              key={index}
              className={rule.id === selectedRule ? classes.selected : ""}
              onClick={() => onRuleClick(rule.id)}
            >
              <ActiveCellStyled>
                <Circle color={rule.isActive ? "green" : "red"} />
              </ActiveCellStyled>
              <RuleCell>
                <RuleText editing={editedRule === rule.id}>
                  {rule.rule}
                </RuleText>
                <RuleInput
                  editing={editedRule === rule.id}
                  defaultValue={editedRule === rule.id ? rule.rule : ""}
                  onBlur={async (e) => {
                    setEditedRule(null);
                    const inputValue = e.target.value;
                    if (await updateRule(rule.id, { rule: inputValue })) {
                      const newRules = currentRules.map((r) => {
                        return r.id === rule.id
                          ? { ...r, rule: inputValue }
                          : r;
                      });
                      setCurrentRules(newRules);
                      setOpenSuccessSnackbar(true);
                    } else {
                      setOpenFailureSnackbar(true);
                    }
                  }}
                />
                {/* <Button onClick={() => setEditedRule(rule.id)}>update</Button> */}
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setEditedRule(rule.id)}
                />
              </RuleCell>
              <ActionTdStyled>
                <ActionContainer>
                  <RuleSwitch isActive={rule.isActive} id={rule.id} />
                  <i
                    className="fa fa-trash"
                    onClick={() => deleteRule(rule.id)}
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "30px",
                      marginRight: "8px",
                    }}
                  ></i>
                </ActionContainer>
              </ActionTdStyled>
            </tr>
          ))}
        </tbody>
      </table>

      {openSeccessSnackBar && (
        <SnackBar
          message={`Rule updated successfully`}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="green"
        />
      )}
      {openFailureSnackBar && (
        <SnackBar
          message={`Cannot update rule`}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="red"
        />
      )}

      {alertVisible && <Notification message={alertMessage} />}
    </>
  );
};

export default RulesTable;
