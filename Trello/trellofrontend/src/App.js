import "./App.css";
import axios from "axios";
import Card from "./components/Card";
import { useEffect, useRef, useState } from "react";
import { createList, getAllList, updateList } from "./api/list";
import InputGroup from "./components/InputGroup";
import { updateItem } from "./api/item";

function App() {
  axios.defaults.baseURL = "http://localhost:5000/api/v1/";
  const [lists, setLists] = useState([]);

  const dragList = useRef(null);
  const dragOverList = useRef(null);
  const currentRank = useRef(null);
  const newRank = useRef(null);
  const itemSelected = useRef(null);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);
  const currentItemRank = useRef(null);
  const newItemRank = useRef(null);

  let newList = undefined;
  let currentList = undefined;
  let draggedList = undefined;
  let draggedItem = undefined;
  const listRefs = useRef([]);
  let rect = undefined;

  // move clone element
  const moveHandle = (e) => {
    const img = document.querySelector(".dragged-item");
    img.style.left = e.clientX - img.offsetWidth / 4 + "px";
    img.style.top = e.clientY + "px";
  };

  // List Drag Handle
  const onDragStart = (e, position, list, height) => {
    e.stopPropagation();

    const parentNode = e.target.parentNode;
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("component", parentNode);
    e.dataTransfer.setDragImage(new Image(), 20, 20);

    dragList.current = position;
    draggedList = document.createElement("div");
    draggedList.classList.add("dragged-item");
    draggedList.style.transform = "rotate(5deg)";
    draggedList.style.width = "280px";
    draggedList.append(parentNode.cloneNode(true));
    document.body.append(draggedList);

    currentRank.current = list.rank;
    itemSelected.current = list._id;
    currentList = list;

    setTimeout(() => {
      moveHandle(e);
      parentNode.style = `background-color: #00000030;border-radius: 5px; height: ${height}px`;
      e.target.style = "visibility: hidden";
    }, 0);
  };

  const onDrag = (e) => {
    e.stopPropagation();
    e.preventDefault();
    moveHandle(e);
  };

  const onDragOver = (e, position, list) => {
    e.stopPropagation();
    e.preventDefault();
    dragOverList.current = position;
    newRank.current = list.rank;
    newList = list;
  };

  const onDragEnd = (e, height) => {
    console.log("end");
    // remove clone element
    document.body.querySelector(".dragged-item").remove();
    draggedList = undefined;
    e.target.parentNode.style = `background-color: #ebecf0; border-radius: 5px; height: ${height}px`;
    e.target.style = "visibility: none";

    if (newRank !== null && dragOverList.current !== null) {
      const copyListItems = [...lists];
      const dragListContent = copyListItems[dragList.current];
      copyListItems.splice(dragList.current, 1);
      copyListItems.splice(dragOverList.current, 0, dragListContent);

      dragList.current = null;
      dragOverList.current = null;

      setLists(copyListItems);
      // update lists rank
      copyListItems.forEach((list, index) => {
        updateList({ rank: index + 1 }, list._id)
          .then((response) => console.log(response.data))
          .catch((error) => console.log(error));
      });
    } else {
      dragList.current = null;
      dragOverList.current = null;
    }
  };

  // Item Drag Handle
  const onDragStartItem = (e, position, item, list) => {
    e.stopPropagation();

    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.setData("text/html", e.target);
    e.dataTransfer.setDragImage(new Image(), 0, 0);

    dragItem.current = position;
    draggedItem = document.createElement("div");
    draggedItem.classList.add("dragged-item");
    draggedItem.style.transform = "rotate(5deg)";
    draggedItem.style.width = "280px";
    draggedItem.setAttribute("type", "item");
    draggedItem.append(e.target.cloneNode(true));
    document.body.append(draggedItem);

    itemSelected.current = item._id;
    currentItemRank.current = item.rank;
    currentList = list;

    setTimeout(() => {
      e.target.parentNode.style =
        "background-color: #00000030; border-radius: 5px;";
      e.target.style = "visibility: hidden";
    }, 0);
  };

  const onDragOverItem = (e, position, item, list) => {
    e.preventDefault();
    e.stopPropagation();
    dragOverItem.current = position;
    newItemRank.current = item.rank;
    newList = list;
    rect = e.target.getBoundingClientRect();
    rect.center = rect.top + (rect.bottom - rect.top) / 2;

    const y = e.clientY;

    if (y < rect.center) {
      if (!newList || newList?._id === currentList?._id)
        if (dragItem.current < dragOverItem.current) dragOverItem.current -= 1;
      console.log("up");
    } else {
      if (newList?._id !== currentList?._id) dragOverItem.current += 1;
      if (!newList || newList?._id === currentList?._id)
        if (dragItem.current > dragOverItem.current) dragOverItem.current += 1;
      console.log("down");
    }
  };

  const onDragEndItem = (e, item, list) => {
    // remove clone element
    e.stopPropagation();
    document.body.querySelector(".dragged-item").remove();
    draggedItem = undefined;
    const currentListIndex = lists.findIndex((b) => b._id === currentList._id);
    const newListIndex = lists.findIndex((b) => b._id === newList._id);
    let currentListItems = currentList.items;

    if (currentList._id === newList._id) {
      currentListItems.splice(dragItem.current, 1);
      currentListItems.splice(dragOverItem.current, 0, item);
      // update item rank
      currentListItems = currentListItems.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      currentListItems.forEach((item) =>
        updateItem({ rank: item.rank }, item._id)
      );
      listRefs.current[currentListIndex].updateItems(currentListItems);
    } else if (newList.items !== undefined) {
      updateItem({ listId: newList._id }, item._id).then((resp) =>
        console.log(resp.data)
      );

      currentListItems.splice(dragItem.current, 1);

      let newListItems = newList.items;
      console.log(newListItems);
      newListItems.splice(dragOverItem.current, 0, item);

      // update item rank of current list
      currentListItems = currentListItems.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      currentListItems.forEach((item, index) =>
        updateItem({ rank: index }, item._id)
      );
      listRefs.current[currentListIndex].updateItems(currentListItems);

      // update item rank of drop list
      newListItems = newListItems.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      newListItems.forEach((item, index) =>
        updateItem({ rank: index }, item._id)
      );

      listRefs.current[newListIndex].updateItems(newListItems);
    }

    dragItem.current = null;
    dragOverItem.current = null;

    e.target.parentNode.style = "background-color: none;";
    e.target.style = "visibility: none";
  };

  useEffect(() => {
    getAllList()
      .then((list) => setLists(list.data))
      .catch((error) => console.log(error));
  }, []);

  // create new list
  const submitAction = (content) => {
    createList({ title: content })
      .then((res) => res.data)
      .then((data) => setLists([...lists, { ...data, items: [] }]))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="list-wrapper">
        {lists.map((list, index) => (
          <Card
            setLists={setLists}
            lists={lists}
            key={list._id}
            index={index}
            list={list}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
            onDragStartItem={onDragStartItem}
            onDragOverItem={onDragOverItem}
            onDragEndItem={onDragEndItem}
            ref={(list) => (listRefs.current[index] = list)}
          />
        ))}
        <InputGroup type="list" variant="white" submitAction={submitAction} />
      </div>
    </div>
  );
}

export default App;
