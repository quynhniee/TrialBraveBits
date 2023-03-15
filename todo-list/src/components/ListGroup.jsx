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
  const [todoList, setTodoList] = useState([]);
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
    console.log(input);
    setFilterType("All");
  };

  const updateData = useCallback(
    (data) => {
      setTodoList(todoList.map((ex) => (ex.id === data.id ? data : ex)));
    },
    [todoList]
  );

  const deleteData = useCallback(
    (data) => {
      setTodoList(todoList.filter((ex) => ex !== data));
    },
    [todoList]
  );

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
