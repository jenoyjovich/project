import React from "react";

const TextArea = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        style={{ resize: "none" }}
        name={name}
        {...rest}
        className="form-control"
        id={name}
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default TextArea;
