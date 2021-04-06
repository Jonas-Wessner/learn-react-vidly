import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import Form from "./form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  title = "Login Form";

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  handleSubmit = () => {
    // Call Server and redirect user
    console.log("Submitted");
  };

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderInput({
          name: "username",
          label: "Username",
          autoFocus: true,
        })}
        {this.renderInput({
          name: "password",
          label: "Password",
        })}
      </React.Fragment>
    );
  };
}

export default LoginForm;
