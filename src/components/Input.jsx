import React from "react";

const Input = ({ type = "text", name, required = false, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      required={required}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default Input;
