import React, { useImperativeHandle, useState } from "react";
import styled from "styled-components";
import { createItem } from "../api/item";
import CardHeader from "./CardHeader";
import CardItem from "./CardItem";
import InputGroup from "./InputGroup";

export const StyledCard = styled.div`
  border-radius: 5px;
  background-color: #ebecf0;
  width: 300px;
  height: fit-content;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  vertical-align: top;
  min-height: 0;
  overflow-y: auto;
`;

const Card = React.forwardRef(
  (
    {
      lists,
      setLists,
      list,
      index,
      onDragStart,
      onDrag,
      onDragOver,
      onDragEnd,
      onDragStartItem,
      onDragOverItem,
      onDragEndItem,
    },
    ref
  ) => {
    const [items, setItems] = useState(list.items);
    let height = undefined;

    const removeItemHandle = (id) => {
      setItems(items.filter((item) => item._id !== id));
    };

    const submitAction = (content) => {
      createItem({ content }, list._id)
        .then((res) => res.data)
        .then((data) => setItems([...items, data]));
    };

    useImperativeHandle(ref, () => ({
      updateItems(items) {
        console.log(items);
        setItems(items);
      },
    }));
    return (
      <>
        <div>
          <StyledCard
            draggable
            onDrag={(e) => onDrag(e)}
            onDragStart={(e) => onDragStart(e, index, list, height)}
            onDragOver={(e) => onDragOver(e, index, list)}
            onDragEnd={(e) => onDragEnd(e, height)}
            onMouseDown={(e) => {
              height = e.currentTarget.offsetHeight;
            }}
          >
            <CardHeader list={list} lists={lists} setLists={setLists} />
            <CardBody>
              {items.map((item, itemIndex) => (
                <CardItem
                  list={list}
                  key={item._id}
                  index={itemIndex}
                  item={item}
                  removeItemHandle={removeItemHandle}
                  onDragStart={onDragStartItem}
                  onDragOver={onDragOverItem}
                  onDragEnd={onDragEndItem}
                />
              ))}
            </CardBody>
            <div style={{ padding: "10px" }}>
              <InputGroup
                submitAction={submitAction}
                type="item"
                variant="gray"
              />
            </div>
          </StyledCard>
        </div>
      </>
    );
  }
);
export default Card;
