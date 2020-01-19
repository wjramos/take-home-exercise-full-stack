import React from 'react';
import styled from '@emotion/styled';

const ButtonBase = styled.button`
  cursor: pointer;
  border-radius: 4px;
  padding: 16px;
  background-color: #00e676;
  border: none;
  box-shadow: 0 10px 25px rgba(79, 82, 177, 0.35);
  color: #fff;
  font-family: museo-slab, sans-serif;
  font-style: normal;
  font-weight: 900;
  font-size: 28px;
  transition: 0.25s ease-in-out background-color;
  
  &:hover {
    background-color: #66ffa6;
  }
  
  &:disabled {
    background-color: #ccc;
    pointer-events: none;
  }
`;

export default function Button(props) {
  return (
    <ButtonBase {...props} />
  );
}