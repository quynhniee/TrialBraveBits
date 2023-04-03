import React, { useRef, useState } from "react";
import { updateItem } from "../api/item";
import { ItemTag, StyledButton } from "./Button";
import EditorCard from "./EditorCard";

const CardItem = ({
  index,
  list,
  item,
  removeItemHandle,
  onDragStart,
  onDragOver,
  onDragEnd,
}) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(item.content);
  const [inputPosition, setInputPosition] = useState({});
  const itemRef = useRef();

  const onClose = () => {
    setEdit(false);
  };

  const onOpen = (e) => {
    setEdit(true);
    const pos = itemRef.current.getBoundingClientRect();
    setInputPosition({
      left: pos.left,
      top: pos.top,
      right: pos.right,
      width: pos.width,
    });
  };

  const saveHandle = (content) => {
    setInput(content);
    updateItem({ content }, item._id)
      .then((resp) => resp.data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
    onClose();
  };

  return (
    <div>
      <ItemTag
        ref={itemRef}
        draggable
        onDragStart={(e) => onDragStart(e, index, item, list)}
        onDragOver={(e) => onDragOver(e, index, item, list)}
        onDragEnd={(e) => onDragEnd(e, item, list)}
      >
        <span className="flex-grow-1">{input}</span>
        <StyledButton variant="gray" onClick={(e) => onOpen(e)}>
          <span className="material-icons" style={{ fontSize: "15px" }}>
            edit
          </span>
        </StyledButton>
      </ItemTag>
      {edit === false ? null : (
        <EditorCard
          onClose={onClose}
          inputPosition={inputPosition}
          item={item}
          input={input}
          saveHandle={saveHandle}
          removeItemHandle={removeItemHandle}
        />
      )}
    </div>
  );
};

export default CardItem;
