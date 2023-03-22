import React, { useState } from "react";
import Button from "./Button";
import InputGroup from "./InputGroup";

const TextInput = ({ getInput }) => {
  const [input, setInput] = useState("");
  const addItemHandle = () => {
    getInput(input);
    setInput("");
  };
  return (
    <InputGroup className="mb-3">
      <input
        id="typeText"
        type="text"
        className="form-control"
        placeholder="Add todo..."
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => (e.key === "Enter" ? addItemHandle() : null)}
        value={input}
      />
      <Button
        onClick={addItemHandle}
        disabled={input.trim() === "" ? true : false}
        style={{ minWidth: "70px" }}
      >
        Add
      </Button>
    </InputGroup>
  );
};

export default TextInput;
