import React from "react";
import PageHeader from "./common/pageHeader";

const NotFoundPage = () => {
  return (
    <div className="container">
      <PageHeader titleText="Error 404"></PageHeader>
      <div className="row">
        <div className="col-12">
          <p>Page not found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
