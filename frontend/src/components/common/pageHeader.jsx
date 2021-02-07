import React from "react";

const PageHeader = ({ titleText }) => {
  return (
    <div className="row">
      <div className="col-12 mt-4">
        <h1
          className="bigTitle"
          style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
        >
          {titleText}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;
