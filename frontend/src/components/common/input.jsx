import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input name={name} {...rest} className="form-control" id={name} />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
