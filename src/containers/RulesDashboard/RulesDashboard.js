import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addRule } from "./../../store/rules/rules.actions";
import RulesModal from "./../../components/RulesModal/RulesModal";
import axios from "axios";
import { fetchRules } from "./../../services/rules.service";
import RulesTable from "./../../components/RulesTable/RulesTable";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import classes from "./RulesDashboard.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { SnackBar } from "../../components/Snackbar/SnackBar";
import styled from "styled-components";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const ErrorMessage = styled.p`
  color: red;
`;

const RulesDashboard = ({ addRule }) => {
  const [rule, setRule] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [displayIntro, setDisplayIntro] = useState(true);
  const [rules, setRules] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [openSeccessSnackBar, setOpenSuccessSnackbar] = useState(false);
  const [openFailureSnackBar, setOpenFailureSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [filteredRules, setFilteredRules] = useState([]);
  const [selectedRule, setSelectedRule] = useState(null);
  const [showFilteredRules, setShowFilteredRules] = useState(false);





  useEffect(() => {
    const fetchAllRules = async () => {
      const fetchedRules = await fetchRules();
      console.log({ fetchedRules });
      setRules(fetchedRules);
    };

    fetchAllRules();
  }, []);

  const onRuleInputChange = (event) => {
    setRule(event.target.value);
  };

  const onAddRuleClick = () => {
    let url = `${process.env.REACT_APP_SERVER_URL}`;
    axios
      .post(`http://localhost:3001/rules`, { rule })
      .then((response) => {
        // setModalMessage("Rule is activated");
        // setShowModal(true);
        setOpenSuccessSnackbar(true);
        setErrorMessage("");
      })
      .catch((error) => {
        // setModalMessage("Error adding rule");
        // setShowModal(true);
        console.log(error.response.data);
        setErrorMessage(error.response.data);
        setOpenFailureSnackbar(true);
      });
    setRule("");
  };

  const onSearchInputChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value) {
      setShowFilteredRules(true);
      const filtered = rules.filter((rule) =>
        rule.rule.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredRules(filtered);
    } else {
      setShowFilteredRules(false);
      setFilteredRules([]);
    }
  };

  

  const onShowRulesClick = async () => {
    const fetchedRules = await fetchRules();
    setRules(fetchedRules);
    setDisplayIntro(false);
  };

  const handleBackClick = () => {
    setDisplayIntro(true);
    setShowTable(false);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const handleRuleClick = (ruleId) => {
    setSelectedRule(ruleId);
    setTimeout(() => setSelectedRule(null), 2000);
  };

  const handleCloseSnackBar = () => {
    setOpenSuccessSnackbar(false);
    setOpenFailureSnackbar(false);
  };

  const FilteredRules = ({ rules, onRuleClick, selectedRule }) => {
    const onRuleClickWrapper = (ruleId) => {
      onRuleClick(ruleId);
      setSearch("");
      setFilteredRules([]); // Clear the filtered rules
      setShowFilteredRules(false); // Hide the filtered rules
    };

    return (
      <div className={classes.FilteredRules}>
        {rules.map((rule) => (
          <div
            key={rule.id}
            className={`${classes.FilteredRule} ${
              rule.id === selectedRule ? classes.selected : ""
            }`}
            onClick={() => onRuleClickWrapper(rule.id)}
          >
            {rule.rule}
          </div>
        ))}
      </div>
    );
  };

  
  

  return (
    <div className={classes.RulesDashboard}>
      {!displayIntro && (
        <button onClick={handleBackClick} className={classes.BackButton}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>Back</span>
        </button>
      )}

      {displayIntro ? (
        <div className={classes.IntroContainer}>
          <h3>Welcome to the Rules Dashboard</h3>
          <p>Would you like to:</p>
          <button
            className={classes.RulesDashboardButton}
            onClick={() => {
              setDisplayIntro(false);
              setShowTable(true);
            }}
          >
            Show Rules
          </button>
          <button
            className={classes.RulesDashboardButton}
            onClick={() => setDisplayIntro(false)}
          >
            Add Rule
          </button>
        </div>
      ) : showTable ? (
        <>
          <div className={classes.SearchContainer}>
            <input
              type="text"
              value={search}
              onChange={onSearchInputChange}
              placeholder="Search for a rule..."
              className={classes.SearchInput}
            />
            <FontAwesomeIcon icon={faSearch} className={classes.SearchIcon} />
            {filteredRules.length > 0 && (
            <FilteredRules rules={filteredRules} onRuleClick={handleRuleClick} selectedRule={selectedRule} />
          )}
          </div>
          <RulesTable
          rules={rules.filter((rule) => rule.rule.toLowerCase().includes(search.toLowerCase()))}
          onRuleClick={handleRuleClick}
          selectedRule={selectedRule}
        />
        </>
      ) : (
        <>
          <h3 className={classes.RulesDashboardHeader}>Add Rule</h3>
          <div className={classes.RulesDashboardInputContainer}>
            <label
              htmlFor="rule-input"
              className={classes.RulesDashboardInputLabel}
            >
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
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        </>
      )}
      {openSeccessSnackBar && (
        <SnackBar
          message={"Rule is activated"}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="green"
        />
      )}
      {openFailureSnackBar && (
        <SnackBar
          message={"Error adding rule"}
          isOpen={true}
          handleCloseSnackBar={handleCloseSnackBar}
          color="red"
        />
      )}
      <RulesModal
        show={showModal}
        onCloseModal={closeModalHandler}
        message={modalMessage}
      />
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
