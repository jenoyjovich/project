import React, { Component } from "react";
import favoriteService from "../services/favoriteService";
import Favorite from "./allRecipes";
import PageHeader from "./common/pageHeader";

class MyFavorites extends Component {
  state = {
    favorites: [],
  };

  async componentDidMount() {
    const { data } = await favoriteService.getFavorites();
    this.setState({ favorites: data });
  }

  render() {
    const { favorites } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Favorites" />
        <div className="row">
          <div className="col-12">
            <p style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>
              Here are your favorite recipes that you have chosen
            </p>
          </div>
        </div>
        <div className="row">
          {favorites.length > 0 &&
            favorites.map((fav) => <Favorite key={fav._id} recipe={fav} />)}
        </div>
      </div>
    );
  }
}

export default MyFavorites;
