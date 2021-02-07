import http from "./httpService";
import { apiUrl } from "../config.json";

export function addToFavorites(recipe) {
  return http.post(`${apiUrl}/users/favorites`, recipe);
}
export function getFavorites() {
  return http.get(`${apiUrl}/users/favorites`);
}

export function searchFavorites(recipeId) {
  return http.get(`${apiUrl}/users/favorites/${recipeId}`);
}

export function deleteFavorite(favoriteId) {
  return http.delete(`${apiUrl}/users/favorites/${favoriteId}`);
}

export default {
  addToFavorites,
  getFavorites,
  searchFavorites,
  deleteFavorite,
};
