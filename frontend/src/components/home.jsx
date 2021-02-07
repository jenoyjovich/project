import React, { Component } from "react";
import recipeService from "../services/recipeService";
import PageHeader from "./common/pageHeader";
import Favorite from "./allRecipes";
import favoriteService from "../services/favoriteService";

class Home extends Component {
  state = {
    recipes: [],
    search: "",
  };

  async componentDidMount() {
    const { data } = await recipeService.getAllRecipes();
    if (data.length > 0) {
      this.setState({ recipes: data });
    }
  }

  updateSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  getSearch = async (e) => {
    const { search } = this.state;
    e.preventDefault();
    if (search === "") {
      const { data } = await recipeService.getAllRecipes();
      if (data.length > 0) {
        this.setState({ recipes: data });
      }
    }
    const { data } = await favoriteService.searchFavorites(search);
    if (data.length > 0) {
      this.setState({ recipes: data });
    }
  };

  render() {
    const { recipes, search } = this.state;
    const { user } = this.props;

    return (
      <div className="container ">
        <PageHeader titleText="Home"></PageHeader>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.getSearch} className="search-form" action="">
              <input
                className="search-bar"
                type="text"
                onChange={this.updateSearch}
                value={search}
              />
              <button className="search-button btn-primary ml-2">Search</button>
            </form>
          </div>
          <div className="row col-12">
            {recipes.length > 0 &&
              recipes.map((recipe) => {
                if (recipe.user_id !== user._id) {
                  return <Favorite key={recipe._id} recipe={recipe} />;
                }
                return null;
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
