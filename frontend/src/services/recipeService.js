import http from "./httpService";
import { apiUrl } from "../config.json";

export function createRecipe(recipe) {
  return http.post(`${apiUrl}/recipes`, recipe);
}

export function getMyRecipes() {
  return http.get(`${apiUrl}/recipes/my-recipes`);
}

export function editRecipe(recipe) {
  const recipeId = recipe._id;
  delete recipe._id;
  return http.put(`${apiUrl}/recipes/${recipeId}`, recipe);
}
export function getRecipe(recipeId) {
  return http.get(`${apiUrl}/recipes/${recipeId}`);
}
export function deleteRecipe(recipeId) {
  return http.delete(`${apiUrl}/recipes/${recipeId}`);
}

export function getAllRecipes() {
  return http.get(`${apiUrl}/recipes`);
}

export default {
  createRecipe,
  getMyRecipes,
  editRecipe,
  getRecipe,
  deleteRecipe,
  getAllRecipes,
};
