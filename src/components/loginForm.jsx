import React, { Component } from "react";
import Input from "./input";

class LoginForm extends Component {
  state = {
    // make sure the property names are the same as the ids
    // of the inputs in order to be able to access them
    // using the bracket-notation in the handleChange-method
    account: { username: "", password: "" },
    errors: {},
  };

  validate = () => {
    const { username, password } = this.state.account;
    const errors = {};

    if (username.trim() === "") {
      errors.username = "Username is required";
    }

    if (password.trim() === "") {
      errors.password = "Password is required";
    }

    return errors;
  };

  /* By default the submission of a form results in a full page reload.
    We do not want that and therefore override the default behavior */
  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);

    this.setState({ errors });
    if (Object.keys(errors).length > 0) return; // if there are error, stop submission

    // Call Server and redirect user
    console.log("Submitted");
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account });
  };

  render() {
    const { account, errors } = this.state;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
            autoFocus
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
