import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class SignIn extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    password: Joi.string().min(5).max(1024).required().label("Password"),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    try {
      await userService.login(email, password);
      window.location = "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText="Sign In"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>
              Sign in to your account
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form
              style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}
              method="POST"
              onSubmit={this.handleSubmit}
              autoComplete="off"
              noValidate
            >
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign In")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
