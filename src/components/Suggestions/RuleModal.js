import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ButtonStyled } from "./suggestions.styles";

export const RuleModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  //   margin-top: 40px;
`;

export const ModalButtonsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 10px;
`;

export const ButtonStyledNew = styled.div`
  background-color: #f6f7ff;
  display: flex;
  color: "#3B5998";
  font-size: 14px;
  align-items: center;
  text-align: center;
  justify-content: center;
  border: 1px solid #d8deea !important;
  min-width: 65px;
  min-height: 30px;
  padding: 0 0.7rem;
  border-radius: 4px;
  transition: 0.3s;
  :hover {
    cursor: pointer;
    background-color: #d8deea;
    border-color: black;
    opacity: 1;
  }
  color: #3b5998;
`;

export const RuleModal = ({ selectedRule, setIsModalOpen }) => {
  const handleCopy = () => {
    const ruleText = selectedRule;
    navigator.clipboard.writeText(ruleText);
    setIsModalOpen(false);
  };

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 150);
  }, []);

  return (
    <>
      {showContent && (
        <RuleModalContainer>
          {selectedRule}
          <ModalButtonsContainer>
            <ButtonStyledNew onClick={handleCopy}>Copy</ButtonStyledNew>
            <ButtonStyledNew onClick={() => setIsModalOpen(false)}>
              Close
            </ButtonStyledNew>
          </ModalButtonsContainer>
        </RuleModalContainer>
      )}
    </>
  );
};
