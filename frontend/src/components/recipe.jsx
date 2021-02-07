import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";

const Recipe = ({ recipe }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = userService.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div className="col-md-6 col-lg-5 mt-3">
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <img
          width="150"
          height="300"
          src={recipe.picture}
          alt={recipe.title}
          className="p-2 card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text pageText">{recipe.description}</p>
          <p
            className="card-text border-top p-2"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <b>
              <i className="fas fa-egg"></i> Ingredients:
            </b>
            <br />
            <span className="pageText">{recipe.ingredients}</span>
          </p>
          <p
            className="card-text border-top p-2"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <b>
              <i className="fas fa-book-open"></i> Instructions:
            </b>
            <br />
            <span className="pageText"> {recipe.directions}</span>
          </p>
          {recipe.user_id === user._id && (
            <Link
              to={`/my-recipes/edit/${recipe._id}`}
              className="btn btn-primary"
            >
              <i className="fas fa-edit"></i> Edit
            </Link>
          )}
          {recipe.user_id === user._id && (
            <Link
              className="btn btn-danger ml-2"
              to={`/my-recipes/delete/${recipe._id}`}
            >
              <i className="far fa-trash-alt"></i> Delete
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
