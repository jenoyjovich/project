import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";

class CreateRecipe extends Form {
  state = {
    data: {
      title: "",
      description: "",
      ingredients: "",
      directions: "",
      picture: "",
    },
    errors: {},
  };

  schema = {
    title: Joi.string().min(4).max(255).required().label("Title"),
    description: Joi.string().min(4).max(255).required().label("Description"),
    ingredients: Joi.string().min(4).max(255).required().label("Ingredients"),
    directions: Joi.string().min(4).max(1024).required().label("Directions"),
    picture: Joi.string().uri().allow("").min(11).max(1024).label("Picture"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    if (!data.picture) {
      delete data.picture;
    }
    const { history } = this.props;
    await recipeService.createRecipe(data);
    toast("A new recipe was posted");
    history.replace("/my-recipes");
  };
  handleCancel = () => {
    this.props.history.push("/my-recipes");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Create a new Recipe"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p>Here you can post one of your recipes!</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form
              method="POST"
              onSubmit={this.handleSubmit}
              noValidate
              autoComplete="off"
            >
              {this.renderInput("title", "Recipe Name")}
              {this.renderInput("description", "Description")}
              {this.renderTextArea(
                "ingredients",
                "Ingredients",
                "Here you place the ingredients as a list",
                5
              )}
              {this.renderTextArea(
                "directions",
                "Instructions",
                "Here you explain the instructions in order to make your recipe",
                5
              )}
              {this.renderInput("picture", "Picture link")}
              {this.renderButton("Add")}
              <button
                onClick={this.handleCancel}
                className="btn btn-secondary ml-2"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateRecipe;
