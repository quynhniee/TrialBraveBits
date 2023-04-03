import React, { useRef } from "react";
import styled from "styled-components";
import { removeItem } from "../api/item";
import { CloseButton, StyledButton } from "./Button";

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #00000090;
  z-index: 2;
`;

const TextArea = styled.textarea`
  outline: none;
  border: none;
  position: absolute;
  word-break: break-word;
  resize: none;
  border-radius: 2px;
`;

const EditorCard = ({
  onClose,
  inputPosition,
  item,
  input,
  saveHandle,
  removeItemHandle,
}) => {
  const inputRef = useRef();

  const closeButtonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    color: "#fff",
    width: "fit-content",
  };
  const saveButtonStyle = {
    ...closeButtonStyle,
    top: inputPosition.top + 100,
    left: inputPosition.left,
  };

  const removeButtonStyle = {
    ...saveButtonStyle,
    top: inputPosition.top,
    left: inputPosition.right + 10,
  };

  const removeHandle = () => {
    removeItemHandle(item._id);
    removeItem(item.listId, item._id).catch((error) => console.log(error));
  };

  return (
    <Backdrop>
      <CloseButton style={closeButtonStyle} onClick={onClose}></CloseButton>
      <StyledButton
        style={removeButtonStyle}
        variant="black"
        onMouseDown={removeHandle}
      >
        Xóa thẻ
      </StyledButton>
      <StyledButton
        variant="primary"
        style={saveButtonStyle}
        onMouseDown={() => saveHandle(inputRef.current.value)}
      >
        Lưu
      </StyledButton>
      <TextArea
        style={{ ...inputPosition, padding: "5px" }}
        ref={inputRef}
        autoFocus
        defaultValue={input}
        onKeyDown={(e) =>
          e.key === "Enter" ? saveHandle(inputRef.current.value) : null
        }
        onFocus={(e) =>
          e.currentTarget.setSelectionRange(
            e.currentTarget.value.length,
            e.currentTarget.value.length
          )
        }
        onBlur={onClose}
        rows={3}
      />
    </Backdrop>
  );
};

export default EditorCard;
