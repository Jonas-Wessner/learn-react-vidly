import React, { Component } from "react";
import Input from "./input";
import Joi, { errors } from "joi-browser";

class LoginForm extends Component {
  state = {
    // make sure the property names are the same as the ids
    // of the inputs in order to be able to access them
    // using the bracket-notation in the handleChange-method
    account: { username: "", password: "" },
    // keys are names of the properties, values are messages about the error: e.g. {username: "Username cannot be empty"}
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  validate = () => {
    const options = { abortEarly: false }; // do not stop after first error
    const { error } = Joi.validate(this.state.account, this.schema, options);
    const errors = {};

    if (!error) return errors; // cannot iterate over null or undefined, which is the case when we have no errors

    for (let item of error.details) {
      errors[item.path[0]] = item.message; // break down complex error object into simpler custom error object
    }
    return errors;
  };

  // this method validates only the given property
  validateProperty = ({ name, value }) => {
    const toValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(toValidate, schema);
    return error ? error.details[0].message : null;
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
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage; // set error if present
    } else {
      delete errors[input.name]; // clear error if not present
    }

    const account = { ...this.state.account };
    account[input.id] = input.value;
    this.setState({ account, errors });
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
