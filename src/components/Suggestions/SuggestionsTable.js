import { Button, Tooltip } from "@material-ui/core";
import Modal from "react-modal";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { useState, useEffect } from "react";
import {
  addSuggestedRule,
  getSuggestions,
  onDeleteSuggestion,
  updateSuggestions,
} from "./suggestions.service";
import styled from "styled-components";
import { RuleCell } from "./RuleCell";

//import { generateRule } from "./suggestions.service";
import "font-awesome/css/font-awesome.min.css";

import {
  ButtonStyled,
  DeviceCellContent,
  NewTag,
  NewTagText,
  TableContainer,
  PaginationContainer,
  TableStyled,
  TdStyled,
  ThStyled,
  TitleStyled,
  ModalStyled,
} from "./suggestions.styles";
import { RuleModal } from "./RuleModal";
import { TABLET_HEIGHT, TABLET_WIDTH } from "../../consts";

const itemsPerPage = 7; // Define how many items you want per page
export const SuggestionsTable = ({ setNewSuggestionsCount }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRule, setSelectedRule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClickable, setIsClickable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      setIsClickable(
        innerWidth <= TABLET_WIDTH && innerHeight <= TABLET_HEIGHT
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRuleClick = (rule) => {
    console.log("Yovel", isClickable);
    if (!isClickable) return;

    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  console.log("Yovel", selectedRule);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSuggestions = await getSuggestions();
      setSuggestions(fetchedSuggestions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setNewSuggestionsCount(0);
    if (suggestions) {
      updateSuggestions();
    }
  }, [suggestions]);

  // Function to handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Calculate the suggestions for the current page
  const suggestionsOnPage = suggestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <TableContainer>
      <TitleStyled>Suggestions</TitleStyled>
      <TableStyled>
        <thead>
          <tr>
            <ThStyled>Device</ThStyled>
            <ThStyled>Suggested Rule</ThStyled>
            <ThStyled>Actions</ThStyled>
          </tr>
        </thead>
        <tbody>
          {suggestionsOnPage.map((suggestion, idx) => {
            const rule = suggestion.rule;
            const { is_new: isNew } = suggestion;
            return (
              <tr key={idx}>
                <TdStyled>
                  <DeviceCellContent>
                    {suggestion.device}
                    {isNew && (
                      <NewTag>
                        <NewTagText>NEW!</NewTagText>
                      </NewTag>
                    )}
                  </DeviceCellContent>
                </TdStyled>
                <TdStyled>
                  <Tooltip title={rule}>
                    <RuleCell onClick={handleRuleClick}>{rule}</RuleCell>
                  </Tooltip>
                </TdStyled>
                <TdStyled>
                  <ButtonStyled
                    className="custom-button"
                    onClick={() => {
                      addSuggestedRule(
                        rule,
                        suggestion.id,
                        suggestions,
                        setSuggestions
                      );
                    }}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add
                  </ButtonStyled>
                  <ButtonStyled
                    className="custom-button"
                    onClick={() =>
                      onDeleteSuggestion(
                        suggestion.id,
                        suggestions,
                        setSuggestions
                      )
                    }
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </ButtonStyled>
                </TdStyled>
              </tr>
            );
          })}
        </tbody>
      </TableStyled>
      <PaginationContainer>
        <Pagination
          count={Math.ceil(suggestions.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </PaginationContainer>

      {isModalOpen && (
        <ModalStyled isOpen={isModalOpen}>
          <RuleModal
            selectedRule={selectedRule}
            setIsModalOpen={setIsModalOpen}
          />
        </ModalStyled>
      )}
    </TableContainer>
  );
};
