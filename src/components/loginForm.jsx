import React from "react";
import Form from "./form";
import Validator from "../modules/validator";

class LoginForm extends Form {
  constructor() {
    super();
    const obj = {
      data: {
        username: "",
        password: "",
      },
    };
    // add this, do not override properties of base class
    Object.assign(this.state, obj);
  }

  title = "Login Form";
  buttonLabel = "Login";

  schema = {
    username: new Validator().notEmpty().setLabel("Username"),
    password: new Validator().notEmpty().setLabel("Password"),
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
