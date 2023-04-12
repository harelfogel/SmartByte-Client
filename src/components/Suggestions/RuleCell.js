import { Button, Tooltip } from "@material-ui/core";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { makeStyles } from '@material-ui/core/styles';
// import Tooltip from '@material-ui/core/Tooltip';


const RuleCellStyled = styled.div`
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: row;
  display: inline-flex;
  flex-direction: row;
`;

const TextStyled = styled.div`
  max-width: 320px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
`;

const TooltipContent = styled.div`
  font-size: 16px;
  background-color: white;
`;

const RuleTooltip = ({ text }) => {
  return <TooltipContent>{text}</TooltipContent>;
};




const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '14px',
    padding: '8px',
  },
}));

export const RuleCell = ({ children }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const divRef = useRef(null);

  const handleCopy = () => {
    const divText = divRef.current.innerText;
    navigator.clipboard.writeText(divText);
    setIsTooltipOpen(true);
    setTimeout(() => setIsTooltipOpen(false), 1000);
  };
  return (
    <RuleCellStyled>
      <Tooltip title={children}>
        <TextStyled ref={divRef}>{children}</TextStyled>
      </Tooltip>
      <Tooltip title="Copied rule!" open={isTooltipOpen}>
        <div>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={faCopy}
            onClick={handleCopy}
          />
        </div>
      </Tooltip>
    </RuleCellStyled>
  );
};
