import { Tooltip } from "@material-ui/core";
import React from "react";
import { useState, useEffect } from "react";
import { getSuggestions, updateSuggestions } from "./suggestions.service";
import styled from "styled-components";
import { RuleCell } from "./RuleCell";
import { generateRule } from "./suggestions.service";

const TableContainer = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  justify-content: center;
  padding-top: 4rem;
  flex-direction: column;
`;

const TableStyled = styled.table`
  //   border-collapse: collapse;
  width: 80%;
  margin-bottom: 2rem;
  margin: auto;
`;

const ThStyled = styled.th`
  //   border: 1px solid #ccc;
  padding: 0.5rem 1.5rem;
  text-align: left;
`;

const TdStyled = styled.td`
  //   border: 1px solid #ccc;
  max-width: 100px;
  padding: 0.5rem 1.5rem;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
  color: gray;
  flex-direction: row;
  // display: inline-block;
`;

// const DeviceCellContent = styled.td`
//   //   border: 1px solid #ccc;
//   min-width: 100px;
//   padding: 0.5rem 1.5rem;
//   text-align: left;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   border-bottom: 1px solid #ccc;
//   color: gray;
//   flex-direction: row;
//   display: flex;
//   flex-wrap: space-around;
//   width: 200px;
//   position: relative;
// `;

const DeviceCellContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

// const RuleCell = styled.div`
// // max-width: 100px;
// text-align: left;
// white-space: nowrap;
// overflow: hidden;
// text-overflow: ellipsis;

// `;

const TitleStyled = styled.p`
  font-size: 1.5rem;
`;

const TableContent = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: green;
`;

export const NewTag = styled.div`
  background-color: #ac98ff;
  width: 4rem;
  height: 1.9rem;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  // position: absolute;
  rigth: 50px;
  :hover {
    cursor: pointer;
  }
  position: relative;
`;

const NewTagText = styled.p`
  color: white;
  size: 1.5rem;
  weight: bold;
  // justify-content: center;
  // align-items: center;
  margin: auto;
  width: 100%;
  position: absolute;
  left: 0.7rem;
  top: 0.2rem;
`;



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
    updateSuggestions();
  },[suggestions])

  return (
    <TableContainer>
      <TitleStyled>Suggestions</TitleStyled>
      <TableStyled>
        <thead>
          <tr>
            <ThStyled>Device</ThStyled>
            <ThStyled>Suggested Rule</ThStyled>
            <ThStyled>Evidence</ThStyled>
            {/* <ThStyled></ThStyled> */}
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
