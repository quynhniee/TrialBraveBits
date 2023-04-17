import React from "react";

const Errors = ({ errors }) => {
  if (!errors || errors.length === 0) return null;

  const errorMessages = Object.entries(errors).map(
    ([key, value]) => key + " " + value.join(", ")
  );

  return (
    <ul className="error-messages">
      {errorMessages.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  );
};

export default Errors;
