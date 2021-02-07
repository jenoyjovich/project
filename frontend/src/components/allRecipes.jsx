import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import favoriteService from "../services/favoriteService";

const Favorite = ({ recipe }) => {
  const [favorites, setFavs] = useState([]);

  async function addFavorite() {
    try {
      await favoriteService.addToFavorites(recipe);
      toast.success("Recipe added to favorites!");
      getMyFavs();
    } catch (err) {
      return err;
    }
  }

  async function removeFavorite() {
    try {
      await favoriteService.deleteFavorite(recipe._id);
      toast.success("Recipe removed from favorites");
      if (window.location.pathname === "/") {
        await getMyFavs();
      } else {
        window.location.pathname = "/my-favorites";
      }
    } catch (err) {
      return err;
    }
  }

  const getMyFavs = async () => {
    const { data } = await favoriteService.getFavorites();
    setFavs(data);
  };

  useEffect(() => {
    getMyFavs();
  }, []);

  return (
    <div className="col-md-6 col-lg-4 mt-3">
      <div className="card shadow p-3 mb-5 bg-white rounded">
        <img
          width="100"
          height="250"
          src={recipe.picture}
          alt={recipe.title}
          className="p-2 card-img-top"
        />

        <div className="card-body">
          {!favorites.some((fav) => fav._id === recipe._id) && (
            <div className="pointer float-right" onClick={addFavorite}>
              <i className="far fa-star "></i>
            </div>
          )}
          {favorites.some((fav) => fav._id === recipe._id) && (
            <div
              onClick={removeFavorite}
              className="pointer ml-auto float-right"
            >
              <i className="fas fa-star "></i>
            </div>
          )}
          <h5 className="card-title" style={{ fontSize: "1.8rem" }}>
            {recipe.title}
          </h5>
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
        </div>
      </div>
    </div>
  );
};

export default Favorite;
