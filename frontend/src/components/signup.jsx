import http from "../services/httpService";
import { apiUrl } from "../config.json";
import React from "react";
import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signup extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().min(6).max(255).required().email().label("Email"),
    password: Joi.string().min(5).max(1024).required().label("Password"),
    name: Joi.string().min(2).max(255).required().label("Name"),
  };

  doSubmit = async () => {
    const data = { ...this.state.data };
    data.admin = false;
    try {
      await http.post(`${apiUrl}/users`, data);
      toast("Your account is set!");
      const { email, password } = this.state.data;
      try {
        await userService.login(email, password);
        window.location = "/";
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.setState({ errors: { email: err.response.data } });
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "User already exists";
        this.setState({ errors });
      }
    }
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText="Sign Up"></PageHeader>
        <div className="row">
          <div className="col-12">
            <p style={{ textShadow: "2px 2px 5px rgba(0,0,0,0.3)" }}>
              Open an account now!
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
              {this.renderInput("name", "Name")}
              {this.renderButton("Sign Up")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
