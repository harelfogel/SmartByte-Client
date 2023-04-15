import { Tooltip } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { getSuggestions, updateSuggestions } from "./suggestions.service";
import styled from "styled-components";
import { RuleCell } from "./RuleCell";
import { generateRule } from "./suggestions.service";
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
            // generateRule(suggestion);
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
                  <Tooltip title={generateRule(suggestion)}>
                    <RuleCell>{generateRule(suggestion)}</RuleCell>
                  </Tooltip>
                </TdStyled>
                <TdStyled>
                  {Object.entries(suggestion.evidence).map((e) => `${e}, `)}
                </TdStyled>
              </tr>
            );
          })}
        </tbody>
      </TableStyled>
    </TableContainer>
  );
};
