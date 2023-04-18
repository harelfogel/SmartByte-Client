import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan, faFire, faSnowflake } from '@fortawesome/free-solid-svg-icons';

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

export const ModeControl = ({ mode, onModeChange }) => {
  const modes = [
    { id: 'cool', icon: faSnowflake, color: 'blue' },
    { id: 'heat', icon: faFire, color: 'red' },
    { id: 'fan', icon: faFan, color: 'black' },
  ];

  return (
    <ModeContainer>
      {modes.map(({ id, icon, color }) => (
        <ModeButton
          key={id}
          color={mode === id ? color : 'grey'}
          onClick={() => onModeChange(id)}
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </ModeButton>
      ))}
    </ModeContainer>
  );
};
