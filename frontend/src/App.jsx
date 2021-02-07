import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import "./css/App.css";
import { ToastContainer } from "react-toastify";
import SignIn from "./components/signin";
import userService from "./services/userService";
import Logout from "./components/logout";
import CreateRecipe from "./components/createRecipe";
import ProtectedRoute from "./components/common/protectedRoute";
import MyRecipes from "./components/my-recipes";
import EditRecipe from "./components/editRecipe";
import DeleteRecipe from "./components/deleteRecipe";
import MyFavorites from "./components/my-favorites";
import NotFoundPage from "./components/404";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = userService.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <div className="BackgroundImageApp"></div>
      <ToastContainer />
      <header>
        <Navbar user={user} />
      </header>
      <main className="container-fluid flex-fill">
        <Switch>
          <Route path="/signup" component={Signup} />
          <ProtectedRoute path="/create-recipe" component={CreateRecipe} />
          <ProtectedRoute path="/my-recipes/edit/:id" component={EditRecipe} />
          <ProtectedRoute
            path="/my-recipes/delete/:id"
            component={DeleteRecipe}
          />
          <ProtectedRoute path="/my-favorites" component={MyFavorites} />

          <ProtectedRoute path="/my-recipes" component={MyRecipes} />
          <Route path="/logout" component={Logout} />
          <Route path="/signin" component={SignIn} />
          <Route
            path="/about"
            render={(props) => <About user={user} {...props} title="About" />}
          />
          <ProtectedRoute
            path="/"
            exact
            render={(props) => <Home user={user} {...props} title={"Home"} />}
          />
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </main>
      <footer className="mt-5 bg-dark">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default App;
