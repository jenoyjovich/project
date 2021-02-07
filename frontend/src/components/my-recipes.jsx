import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import recipeService from "../services/recipeService";
import Recipe from "./recipe";
import { Link } from "react-router-dom";

class MyRecipes extends Component {
  state = {
    recipes: [],
  };

  async componentDidMount() {
    const { data } = await recipeService.getMyRecipes();
    if (data.length > 0) {
      this.setState({ recipes: data });
    }
  }

  render() {
    const { recipes } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Recipes" />
        <div className="row">
          <div className="col-12">
            <p style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>
              List of your recipes
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Link to="/create-recipe" className="btn btn-primary">
              + Create a new Recipe
            </Link>
          </div>
        </div>
        <div className="row">
          {recipes.length > 0 &&
            recipes.map((recipe) => (
              <Recipe key={recipe._id} recipe={recipe} />
            ))}
          {recipes.length <= 0 && (
            <span className="col-md-6 col-lg-4 mt-3">
              <i> You have no recipes</i>
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default MyRecipes;
