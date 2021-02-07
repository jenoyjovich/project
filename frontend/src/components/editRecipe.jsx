import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import recipeService from "../services/recipeService";
import { toast } from "react-toastify";

class EditRecipe extends Form {
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
    _id: Joi.string(),
    title: Joi.string().min(4).max(255).required().label("Title"),
    description: Joi.string().min(4).max(255).required().label("Description"),
    ingredients: Joi.string().min(4).max(255).required().label("Ingredients"),
    directions: Joi.string().min(4).max(1024).required().label("Directions"),
    picture: Joi.string().uri().allow("").min(11).max(1024).label("Picture"),
  };

  doSubmit = async () => {
    const { data } = this.state;
    await recipeService.editRecipe(data);
    toast.success("Card is updated");
    this.props.history.replace("/my-recipes");
  };

  async componentDidMount() {
    const recipeId = this.props.match.params.id;
    console.log(recipeId);
    const { data } = await recipeService.getRecipe(recipeId);
    this.setState({ data: this.mapToViewModel(data) });
  }

  handleCancel = () => {};

  mapToViewModel(recipe) {
    return {
      _id: recipe._id,
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients,
      directions: recipe.directions,
      picture: recipe.picture,
    };
  }

  handleCancel = () => {
    this.props.history.push("/my-recipes");
  };

  render() {
    return (
      <div className="container">
        <PageHeader titleText="Edit your recipe"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p>
              <i className="fas fa-edit"></i> Here you can edit your recipe details
            </p>
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
                "Here you place the ingredients",
                5
              )}
              {this.renderTextArea(
                "directions",
                "Instructions",
                "This is a placeholder...",
                5
              )}
              {this.renderInput("picture", "Picture link")}
              {this.renderButton("Update Recipe")}
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

export default EditRecipe;
