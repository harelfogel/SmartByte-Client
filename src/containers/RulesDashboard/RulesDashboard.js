import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRule } from "./../../store/rules/rules.actions";
import RulesModal from "./../../components/RulesModal/RulesModal";
import axios from 'axios';

import classes from "./RulesDashboard.module.scss";

const RulesDashboard = ({ addRule }) => {
  const [rule, setRule] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const onRuleInputChange = (event) => {
    setRule(event.target.value);
  };

  const onAddRuleClick = () => {
    let url= `${process.env.REACT_APP_SERVER_URL}`;
    console.log(url);
    axios.post(`http://localhost:3001/rules`, {rule})
      .then(response => {
        console.log(response.data);
        setModalMessage("Rule is activated");
        setShowModal(true);
      })
      .catch(error => {
        setModalMessage("Error adding rule");
        setShowModal(true);
      });
    setRule("");
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className={classes.RulesDashboard}>
      <h3 className={classes.RulesDashboardHeader}>Rules</h3>
      <div className={classes.RulesDashboardInputContainer}>
        <label htmlFor="rule-input" className={classes.RulesDashboardInputLabel}>
          Type a rule to improve your home's behavior:
        </label>
        <input
          type="text"
          id="rule-input"
          value={rule}
          onChange={onRuleInputChange}
          placeholder="Type your rule here..."
          className={classes.RulesDashboardInput}
        />
        <button
          onClick={onAddRuleClick}
          disabled={!rule}
          className={classes.RulesDashboardButton}
        >
          Add
        </button>
      </div>
      <RulesModal show={showModal} onCloseModal={closeModalHandler} message={modalMessage} />
    </div>
  );
};

RulesDashboard.propTypes = {
  addRule: PropTypes.func,
};

const mapDispatchToProps = {
  addRule,
};

export default connect(null, mapDispatchToProps)(RulesDashboard);
