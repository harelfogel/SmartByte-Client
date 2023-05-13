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
import {updateRule } from "../../services/rules.service";
import { SnackBar } from "../Snackbar/SnackBar";
import EditIcon from "@material-ui/icons/Edit";
import {
  TableStyled,
  ThStyled,
  TitleStyled,
  TableContainer
} from "../Suggestions/suggestions.styles";
import { ActionContainer, ActionTdStyled, ActiveCellStyled, Circle, RuleCell, RuleInput, RuleText, TrStyled } from "./rules.styles";


// const label = { inputProps: { 'aria-label': 'Switch demo' } };

const SERVER_URL = "http://localhost:3001/rules";
const SERVER_URL_1 = "http://localhost:3001";

const RulesTable = ({ rules, onRuleClick, selectedRule, searchText, userRole }) => {
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

  const isSearched = (rule) => {
    return rule.rule.toLowerCase().includes(searchText.toLowerCase());
  };


  const notifyAdmin = async (subject, text) => {
    try {
      await axios.post(`${SERVER_URL_1}/notifyadmin`, { subject, text });
    } catch (error) {
      console.error("Failed to send email notification to admin:", error);
    }
  };
  

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
    <TableContainer>
      <TitleStyled>Rules</TitleStyled>
      <TableStyled className={classes.RulesTable}>
        <thead>
          <TrStyled>
            <ThStyled>Active</ThStyled>
            <ThStyled>Rule</ThStyled>
            <ThStyled>Action</ThStyled>
          </TrStyled>
        </thead>
        <tbody>
          {currentRules.map((rule, index) => (
            <TrStyled
              key={rule.id}
              onClick={() => onRuleClick(rule.id)}
              isSelected={rule.id === selectedRule}
              isSearched={isSearched(rule)}
              classes={classes}
              isStrict={rule.isStrict} 

            >
              <ActiveCellStyled>
                <Circle color={rule.isActive ? "green" : "red"} />
              </ActiveCellStyled>
              <RuleCell>
                <RuleText editing={editedRule === rule.id}>
                  {rule.rule}
                </RuleText>
                {userRole !== "User" && (
                  <>
                    <RuleInput
                      editing={editedRule === rule.id}
                      defaultValue={editedRule === rule.id ? rule.rule : ""}
                      onBlur={async (e) => {
                        console.log('im in the onZBLur function');
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

                        if(userRole === "User"){
                          console.log('before calling fuctnion in notfy admin');
                          await notifyAdmin("User created a rule", `The rule "${rule.rule}"has been modified by the user.`)
                        }
                      }}
                    />
                    <EditIcon
                      style={{ cursor: "pointer" }}
                      onClick={() => setEditedRule(rule.id)}
                    />
                  </>
                )}
              </RuleCell>
              <ActionTdStyled>
                <ActionContainer>
                  <RuleSwitch isActive={rule.isActive} id={rule.id} currentRules={currentRules} setCurrentRules={setCurrentRules} />
                  {userRole !== "User" && (
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
                  )}
                </ActionContainer>
              </ActionTdStyled>
            </TrStyled>
          ))}
        </tbody>
      </TableStyled>

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
    </TableContainer>
  );
};

export default RulesTable;
