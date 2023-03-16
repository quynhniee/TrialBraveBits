import React, { useState, useCallback, useEffect } from "react";
import {
  MDBIcon,
  MDBInputGroup,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import ListGroupItem from "./ListGroupItem";
import TextInput from "./TextInput";
import Dropdown from "./Dropdown";

const ListGroup = () => {
  const list = JSON.parse(localStorage.getItem("todoList"));
  const [todoList, setTodoList] = useState(list ? list : []);
  const [filterData, setFilterData] = useState(todoList);
  const [filterType, setFilterType] = useState("All");
  const [searchText, setSearchText] = useState("");

  const getInput = (input) => {
    if (input.trim() === "") return;
    let newData = {
      id: new Date().getTime().toString(36).substring(2),
      content: input,
      completed: false,
      deleted: false,
    };
    setTodoList([newData, ...todoList]);
    setFilterType("All");
  };

  const updateData = (data) => {
    setTodoList(todoList.map((ex) => (ex.id === data.id ? data : ex)));
  };

  const deleteData = (data) => {
    setTodoList(todoList.filter((ex) => ex.id !== data.id));
  };

  const getFilter = useCallback(
    (filter) => {
      setFilterType(filter);
      switch (filter) {
        case "Completed":
          setFilterData(todoList.filter((ex) => ex.completed === true));
          break;
        case "In progress":
          setFilterData(todoList.filter((ex) => ex.completed !== true));
          break;
        default:
          setFilterData(todoList);
          setFilterType("All");
          break;
      }
    },
    [todoList]
  );

  const searchHandle = () => {
    setFilterData(
      todoList.filter((ex) =>
        new RegExp("^.*" + searchText + ".*$", "im").test(ex.content)
      )
    );
  };

  useEffect(() => {
    setFilterData(todoList);
    getFilter(filterType);
  }, [todoList, filterType, getFilter]);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <MDBListGroup className="" light>
      <TextInput getInput={getInput} />
      {filterData.map((e) => (
        <ListGroupItem
          data={e}
          key={e.id}
          updateData={updateData}
          deleteData={deleteData}
        />
      ))}
      <MDBListGroupItem
        noBorders
        className="d-flex position-sticky bottom-0"
        style={{ zIndex: 3 }}
      >
        <MDBInputGroup
          textBefore={[
            <Dropdown getFilter={getFilter} />,
            <MDBIcon fas icon="search" />,
          ]}
        >
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? searchHandle() : null)}
          />
        </MDBInputGroup>
      </MDBListGroupItem>
    </MDBListGroup>
  );
};

export default ListGroup;
