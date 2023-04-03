import React from "react";
import styled from "styled-components";

export const ItemTag = styled.div`
  background-color: #fff;
  padding: 5px 5px 5px 10px;
  box-shadow: 0 1px 0 #091e4240;
  border: none;
  border-radius: 5px;
  text-align: start;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  > button {
    opacity: 0;
    transition: 0.1s linear;
  }
  :hover {
    background-color: #f4f5f7;
    > button {
      opacity: 1;
    }
  }
`;

const button = {
  white: {
    text: "#fff",
    dark: "#ffffff30",
    darker: "#ffffff50",
  },
  gray: {
    text: "#5e6c84",
    dark: "transparent",
    darker: "#091e4213",
  },
  primary: {
    text: "#fff",
    dark: "#0079bf",
    darker: "#0167a1",
  },
  black: {
    text: "#fff",
    dark: "#00000090",
    darker: "#000000ba",
  },
};

export const StyledButton = styled(ItemTag)`
  ${(props) => {
    const variant = props.variant;
    return `
            background-color: ${button[variant].dark};
            color: ${button[variant].text};
            :hover {
                background-color: ${button[variant].darker};
            }
        `;
  }}
  box-shadow: none;
  display: flex;
  justify-content: start;
  gap: 7px;
  align-items: center;
  padding: 5px;
`;

export const Button = ({ onClick, variant = "gray", value }) => {
  return (
    <StyledButton onClick={onClick} variant={variant}>
      <span className="material-icons">add</span>
      <span>{value}</span>
    </StyledButton>
  );
};

export const CloseButton = ({ onClick, style }) => {
  return (
    <span
      className="material-icons"
      onClick={onClick}
      style={{
        cursor: "pointer",
        opacity: 0.6,
        ...style,
      }}
    >
      clear
    </span>
  );
};
