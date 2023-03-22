import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Button, { IconButton } from "./Button";
import Input from "./Input";
import useClickOutside from "../hook/clickOutside";

const StyledListGroupItem = styled(Button)`
  background-color: "#fff";
  color: "#4f4f4f";
  padding: 1rem;
  & button {
    opacity: 0;
    transition: 0.5s ease;
  }
  &:hover button {
    opacity: 1;
  }
`;

const ListGroupItem = ({
  data,
  updateData,
  deleteData,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  const [newData, setNewData] = useState(data);
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(newData.content);
  const checkHandle = () => {
    setNewData({ ...newData, completed: !newData.completed });
  };

  const deleteHandle = () => {
    deleteData(newData);
  };

  const editHandle = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    updateData(newData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);

  return (
    <StyledListGroupItem
      ref={useClickOutside(() => {
        setContent(newData.content);
        setEdit(false);
      })}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      draggable
      color={newData.completed ? "success" : "light"}
      className="px-3 d-flex justify-content-between align-items-center"
    >
      {!edit ? (
        <span
          className={
            newData.completed
              ? "text-break text-decoration-line-through"
              : "text-break"
          }
        >
          {newData.content}
        </span>
      ) : (
        <Input
          autoFocus={true}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setNewData({ ...newData, content: content });
              setEdit(false);
            }
          }}
          style={{
            borderBottom: " 1px #000 dotted",
            background: "transparent",
          }}
        />
      )}

      <div className="d-flex flex-row gap-2">
        {!edit && (
          <IconButton as="a" href="#" variant="outline" onClick={editHandle}>
            <span className="material-icons">edit</span>
          </IconButton>
        )}
        <IconButton
          as="a"
          href="#"
          variant="outline"
          // color="success"
          onClick={checkHandle}
        >
          <span className="material-icons">done</span>
        </IconButton>

        <IconButton
          as="a"
          href="#"
          variant="outline"
          color="error"
          onClick={deleteHandle}
        >
          <span className="material-icons">clear</span>
        </IconButton>
      </div>
    </StyledListGroupItem>
  );
};

export default ListGroupItem;
