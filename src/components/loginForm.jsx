import React from "react";
import Joi from "joi-browser";
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
          type: "password",
        })}
      </React.Fragment>
    );
  };
}

export default LoginForm;
