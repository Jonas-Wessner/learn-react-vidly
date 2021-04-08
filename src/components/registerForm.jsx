import React from "react";
import Validator from "../modules/validator";
import Form from "./form";

class RegisterForm extends Form {
  constructor() {
    super();
    const obj = {
      data: {
        username: "",
        password: "",
        name: "",
      },
    };
    // add this, do not override properties of Form
    Object.assign(this.state, obj);
  }

  title = "Register Form";
  buttonLabel = "Register";

  schema = {
    username: new Validator().notEmpty().email().setLabel("Username"),
    password: new Validator()
      .notEmpty()
      .minLength(6)
      .maxLength(16)
      .setLabel("Password"),
    name: new Validator().notEmpty().setLabel("Name"),
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
        {this.renderInput({
          name: "name",
          label: "Name",
        })}
      </React.Fragment>
    );
  };
}

export default RegisterForm;
