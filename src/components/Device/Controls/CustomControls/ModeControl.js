import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan, faFire, faSnowflake, faTint, faMagic } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const ModeButton = styled.button`
  margin: 0 5px;
  border: none;
  background-color: transparent;
  color: ${({ color }) => color};
  font-weight: ${({ color }) => (color !== 'transparent' ? 'bold' : 'normal')};
  cursor: pointer;
  &:hover {
    color: ${({ color }) => (color !== 'transparent' ? color : '#888')};
  }
`;

const ModeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const useStyles = makeStyles((theme) => ({
  tooltip: {
    backgroundColor: '#333',
    color: '#fff',
    fontSize: '14px',
    padding: '8px',
  },
}));

export const ModeControl = ({ mode, onModeChange }) => {
  const classes = useStyles();
  const modes = [
    { id: 'cool', icon: faSnowflake, color: 'blue', tooltip: 'Cool' },
    { id: 'heat', icon: faFire, color: 'red', tooltip: 'Heat' },
    { id: 'fan', icon: faFan, color: 'black', tooltip: 'Fan' },
    { id: 'dry', icon: faTint, color: 'purple', tooltip: 'Dry' },
    { id: 'automatic', icon: faMagic, color: 'green', tooltip: 'Automatic' },
  ];

  return (
    <ModeContainer>
      {modes.map(({ id, icon, color, tooltip }) => (
        <Tooltip title={tooltip} classes={{ tooltip: classes.tooltip }} key={id}>
          <ModeButton
            color={mode === id ? color : 'grey'}
            onClick={() => onModeChange(id)}
          >
            <FontAwesomeIcon icon={icon} size="3x" />
          </ModeButton>
        </Tooltip>
      ))}
    </ModeContainer>
  );
};
