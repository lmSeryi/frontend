import React from "react";

const Input = ({
  type = "text",
  name,
  required = false,
  value,
  onChange,
  className,
}) => {
  const labelName = `${name.charAt(0).toUpperCase()}${name.substring(1)}`;

  return (
    <>
      <label className="form_label">{labelName}</label>
      <input
        className={className}
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete="off"
      />
    </>
  );
};

export default Input;
