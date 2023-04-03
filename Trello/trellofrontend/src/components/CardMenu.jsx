import React from "react";
import { deleteList } from "../api/list";
import { StyledButton } from "./Button";
import Swal from "sweetalert2";

const CardMenu = ({ list, lists, setLists, setEdit }) => {
  const deleteListHandle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        setLists(lists.filter((l) => l._id !== list._id));

        deleteList(list._id)
          .then((resp) => resp.data)
          .then((data) => console.log(data));
      }
    });
  };
  return (
    <div className="dropdown">
      <StyledButton
        variant="gray"
        className="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="material-icons">more_horiz</span>
      </StyledButton>
      <ul className="dropdown-menu">
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={deleteListHandle}
          >
            Delete list
          </button>
        </li>
        <li>
          <button
            className="dropdown-item"
            type="button"
            onClick={() => setEdit(true)}
          >
            Update title
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CardMenu;
