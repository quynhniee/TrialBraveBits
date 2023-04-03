import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Button, CloseButton, StyledButton } from "./Button";

export const Input = styled.input`
  border: none;
  outline: none;
  background-color: #fff;
  padding: 5px 10px;
  box-shadow: 0 1px 0 #091e4240;
  border-radius: 5px;
  text-align: start;
  width: 100%;
`;

const Form = styled.form`
  font-weight: lighter;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: fit-content;
`;

const InputGroup = ({ submitAction, type, variant }) => {
  const formStyle = {
    borderRadius: "5px",
    backgroundColor: "#ebecf0",
    width: "300px",
    padding: " 5px",
  };
  const [expand, setExpand] = useState(false);
  const inputRef = useRef();

  const submitHandle = (e) => {
    e.preventDefault();
    const content = inputRef.current.value;
    submitAction(content);
    inputRef.current.value = "";
  };
  const onClick = () => {
    setExpand(!expand);
  };

  return (
    <Form
      onSubmit={(e) => submitHandle(e)}
      style={type === "list" && expand === true ? formStyle : null}
    >
      {expand === true ? (
        <>
          <Input
            autoFocus
            placeholder={
              type === "list"
                ? "Nhập tiêu đề danh sách..."
                : "Nhập tiêu đề cho thẻ này..."
            }
            ref={inputRef}
            style={{ paddingBottom: type === "list" ? "5px" : "30px" }}
            onBlur={() => setExpand(false)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <StyledButton variant="primary" onMouseDown={submitHandle}>
              {type === "list" ? "Thêm danh sách khác" : "Thêm thẻ"}
            </StyledButton>
            <CloseButton onClick={onClick} />
          </div>
        </>
      ) : (
        <Button
          onClick={onClick}
          value={type === "list" ? "Thêm danh sách khác" : "Thêm thẻ"}
          variant={variant}
        />
      )}
    </Form>
  );
};

export default InputGroup;
