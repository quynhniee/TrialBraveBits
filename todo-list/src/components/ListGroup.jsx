import React, { useState, useEffect, useRef } from "react";
import ListGroupItem from "./ListGroupItem";
import TextInput from "./TextInput";
import styled from "styled-components";

const StyledListGroup = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  border-radius: 0.5rem;
  & > :not(:last-child),
  & > :not(:first-child) {
    border: 2px solid #f5f5f5;
    border-width: 0 0 2px;
  }
`;

const ListGroup = () => {
  const list = JSON.parse(localStorage.getItem("todoList"));
  const [todoList, setTodoList] = useState(list ? list : []);
  var draggedItem = useRef();

  const getInput = (input) => {
    if (input.trim() === "") return;
    let newData = {
      id: new Date().getTime().toString(36).substring(2),
      content: input,
      completed: false,
      deleted: false,
    };
    setTodoList([newData, ...todoList]);
  };

  const updateData = (data) => {
    setTodoList(todoList.map((ex) => (ex.id === data.id ? data : ex)));
  };

  const deleteData = (data) => {
    setTodoList(todoList.filter((ex) => ex.id !== data.id));
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const dragStartHandle = (e, index) => {
    draggedItem.current = todoList[index];
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setDragImage(e.target, 20, 20);
  };

  const dragOverHandle = (e, index) => {
    e.preventDefault();
    const draggedOverItem = todoList[index];
    if (draggedItem.current === draggedOverItem) return;
    let items = todoList.filter((item) => item !== draggedItem.current);
    items.splice(index, 0, draggedItem.current);
    setTodoList(items);
  };

  const dragEndHandle = () => {
    draggedItem.current = null;
  };

  return (
    <StyledListGroup>
      <TextInput getInput={getInput} />
      {todoList.map((item, index) => (
        <ListGroupItem
          onDragStart={(e) => dragStartHandle(e, index)}
          onDragOver={(e) => dragOverHandle(e, index)}
          onDragEnd={dragEndHandle}
          data={item}
          key={item.id}
          updateData={updateData}
          deleteData={deleteData}
        />
      ))}
    </StyledListGroup>
  );
};

export default ListGroup;
