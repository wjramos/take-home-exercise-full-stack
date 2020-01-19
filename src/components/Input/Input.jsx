import React, { useState } from 'react';
import styled from '@emotion/styled';
import { CompactPicker } from 'react-color';

const Tooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 5px);
  z-index: 999;
`;

const Label = styled.label`
  text-align: left;
  position: relative;
  display: block;
  margin-top: 16px;
  
  &:first {
    margin-top: 0;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 100%;
    width: 100%;
    left: 0;
    background-color: #ccc;
    height: 3px;
  }
  
  &:focus-within {
    &:after {
      background-color: #333;
      height: 5px;
    }
  }
`;

const LabelText = styled.p`
  margin: 0;
`;

const inputStyles = `
  padding: 8px;
  font-size: 16px;
  margin-bottom: 16px;
  width: 100%;
  border: none;
  margin: 0;
  outline: none;
`;

// @TODO Should display outline only on keyboard navigation
// @TODO text color should be based on contrast and whether selected color is light or dark
const InputBase = styled.input`
  ${inputStyles}

  color: ${props => props.backgroundColor ? '#fff' : '#000'};
  background-color: ${props => props.backgroundColor || '#fff'};

  ::-webkit-input-placeholder {
    color: ${props => props.backgroundColor ? '#fff' : '#999'};
  }
`;

const TextAreaBase = styled.textarea`
  ${inputStyles}

  resize: none;

  color: ${props => props.backgroundColor ? '#fff' : '#000'};
  background-color: ${props => props.backgroundColor || '#fff'};

  ::-webkit-input-placeholder {
    color: ${props => props.backgroundColor ? '#fff' : '#999'};
  }
`;

// @TODO add validation and error display
export default function Input({ label, type, onChange, onFocus, onBlur, tooltip, placeholder = 'Enter value', ...restProps }) {
  const { rows, value = '' } = restProps;
  const [focused, setFocus] = useState(false);

  if (type === 'color') {
    // @TODO validate color values
    // @TODO dismiss tooltip on selection
    tooltip = tooltip || (
      <CompactPicker
        color={value || '#fff'}
        onChangeComplete={({ hex }) => {
          onChange(hex);
          setFocus(false);
        }}
      />
    )
  }

  const InputComponent = rows && rows > 1 ? TextAreaBase : InputBase;

  return (
    <Label>
      <LabelText>
        {label}
      </LabelText>

      <InputComponent
        {...restProps}
        backgroundColor={type === 'color' ? value : undefined}
        placeholder={placeholder}
        onChange={onChange ? ({ target }) => onChange(target.value) : undefined}
        onFocus={() => {
          setFocus(true);

          if (onFocus) onFocus();
        }}
        onBlur={({ target }) => {
          // @TODO need to detect whether target is within label ref
          // setFocus(false);

          if (onBlur) onBlur(target.value);
        }}
      />

      {tooltip && focused && (
        <Tooltip>
          {tooltip}
        </Tooltip>
      )}
    </Label>
  );
}