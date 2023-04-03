import React, { useImperativeHandle, useRef, useState } from "react";
import styled from "styled-components";
import { createItem } from "../api/item";
import { getAllList, getList } from "../api/list";
import CardHeader from "./CardHeader";
import CardItem from "./CardItem";
import InputGroup from "./InputGroup";

export const StyledCard = styled.div`
  border-radius: 5px;
  background-color: #ebecf0;
  width: 300px;
  height: fit-content;
  display: inline-block;
  margin: 0 10px 0 0;
  top: 0;
  flex-shrink: 0;
`;

const CardBody = styled.div`
  padding: 0 10px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  vertical-align: top;
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

    const removeItemHandle = (id) => {
      setItems(items.filter((item) => item._id !== id));
    };

    const submitAction = (content) => {
      createItem({ content }, list._id)
        .then((res) => res.data)
        .then((data) => setItems([...items, data]));
    };

    useImperativeHandle(ref, () => ({
      getData() {
        console.log(list);
        getList(list._id)
          .then((resp) => resp.data)
          .then((data) => setItems(data.items))
          .catch((error) => console.log(error));
      },
    }));
    return (
      <>
        <StyledCard>
          <div
            draggable
            onDrag={(e) => onDrag(e)}
            onDragStart={(e) => onDragStart(e, index, list)}
            onDragOver={(e) => onDragOver(e, index, list)}
            onDragEnd={(e) => onDragEnd(e)}
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
              <InputGroup
                submitAction={submitAction}
                type="item"
                variant="gray"
              />
            </CardBody>
          </div>
        </StyledCard>
      </>
    );
  }
);
export default Card;
