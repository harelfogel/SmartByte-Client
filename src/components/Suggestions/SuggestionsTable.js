import { Button, Tooltip } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { addSuggestedRule, getSuggestions, onDeleteSuggestion, updateSuggestions } from "./suggestions.service";
import styled from "styled-components";
import { RuleCell } from "./RuleCell";

//import { generateRule } from "./suggestions.service";
import 'font-awesome/css/font-awesome.min.css';

import {
  DeviceCellContent,
  NewTag,
  NewTagText,
  TableContainer,
  TableStyled,
  TdStyled,
  ThStyled,
  TitleStyled,
} from "./suggestions.styles";

export const SuggestionsTable = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSuggestions = await getSuggestions();
      setSuggestions(fetchedSuggestions);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (suggestions) {
      updateSuggestions();
    }
  }, [suggestions]);


  return (
    <TableContainer>
      <TitleStyled>Suggestions</TitleStyled>
      <TableStyled>
        <thead>
          <tr>
            <ThStyled>Device</ThStyled>
            <ThStyled>Suggested Rule</ThStyled>
            <ThStyled>Evidence</ThStyled>
          </tr>
        </thead>
        <tbody>
          {suggestions.map((suggestion, idx) => {
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
                    <RuleCell>{rule}</RuleCell>
                  </Tooltip>
                </TdStyled>
                <TdStyled>
                  {/* {Object.entries(suggestion.evidence).map((e) => `${e}, `)} */}
                  <button
                    className="custom-button add-button"
                    onClick={() => addSuggestedRule(rule)}
                  >
                    <i className="fa fa-plus" aria-hidden="true"></i> Add
                  </button>
                  <button
                    className="custom-button delete-button"
                    onClick={() => onDeleteSuggestion(suggestion.id, suggestions, setSuggestions)}
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i> Delete
                  </button>
                </TdStyled>
              </tr>
            );
          })}
        </tbody>
      </TableStyled>
    </TableContainer>
  );
};
