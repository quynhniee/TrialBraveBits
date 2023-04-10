import React from "react";

const Errors = ({ errors }) => {
  return (
    <ul className="error-messages">
      {errors.map((error) => (
        <li key={error}>error</li>
      ))}
    </ul>
  );
};

export default Errors;
