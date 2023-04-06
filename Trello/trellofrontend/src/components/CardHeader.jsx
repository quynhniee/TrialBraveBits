import styled from "styled-components";
import React, { useState } from "react";
import { Input } from "./InputGroup";
import { updateList } from "../api/list";
import CardMenu from "./CardMenu";

const CardHeaderStyle = styled.div`
  padding: 10px 15px 5px 15px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const CardHeader = ({ list, lists, setLists }) => {
  const [title, setTitle] = useState(list.title);
  const [edit, setEdit] = useState(false);

  const updateHandle = (e) => {
    setTitle(e.target.value);
    updateList({ title: e.target.value }, list._id).catch((error) =>
      console.log(error)
    );
    setEdit(false);
  };

  return (
    <CardHeaderStyle>
      {edit === false ? (
        <div style={{ marginLeft: "5px" }} onClick={() => setEdit(true)}>
          {title}
        </div>
      ) : (
        <Input
          autoFocus
          style={{
            fontWeight: "bold",
            boxShadow: "none",
            padding: "0 5px",
            outline: "2px solid blue",
            borderRadius: "2px",
          }}
          onFocus={(e) =>
            e.currentTarget.setSelectionRange(
              e.currentTarget.value.length,
              e.currentTarget.value.length
            )
          }
          defaultValue={title}
          onBlur={() => setEdit(false)}
          onKeyDown={(e) => (e.key !== "Enter" ? null : updateHandle(e))}
        />
      )}
      <CardMenu
        list={list}
        lists={lists}
        setLists={setLists}
        setEdit={setEdit}
      />
    </CardHeaderStyle>
  );
};

export default CardHeader;
