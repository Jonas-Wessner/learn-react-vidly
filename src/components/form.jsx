import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import Input from "./input";
import { empty } from "./common/utils";

class Form extends Component {
  state = { data: {}, errors: {} };

  title = "Form";
  buttonLabel = "Submit";

  validate = () => {
    const options = { abortEarly: false }; // do not stop after first error
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};

    if (!error) return errors; // cannot iterate over null or undefined, which is the case when we have no errors

    for (let item of error.details) {
      errors[item.path[0]] = item.message; // break down complex error object into simpler custom error object
    }
    return errors;
  };

  // returns a new error object that results from this.state.errors with the given property updated
  validateProperty = ({ name, value }) => {
    const toValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(toValidate, schema);

    const errors = { ...this.state.errors };

    if (error) {
      errors[name] = error.details[0].message; // set error if present
    } else {
      delete errors[name]; // clear error if not present
    }

    return errors;
  };

  /* By default the submission of a form results in a full page reload.
    We do not want that and therefore override the default behavior */
  submit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors });
    if (!empty(errors)) return; // if there are error, stop submission

    this.handleSubmit();
  };

  handleSubmit = () => {
    throw new Error(
      "handleSubmit is not defined. When extending the Form-class, supply a handleSubmit-function that will be called when the Submit-Button is pressed."
    );
  };

  renderContent = () => {
    throw new Error(
      "renderContent is not defined. When extending the Form-class, supply a renderContent-function that will be called to render the content inside the form-tag."
    );
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = this.validateProperty(input);

    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };

  renderInput = ({ name, label, ...rest }) => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        {...rest}
      />
    );
  };

  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        <form onSubmit={this.submit}>
          {this.renderContent()}
          <button
            className={"btn btn-primary"}
            // cannot use this.state.errors, because this will only hold the errors displayed to the user,
            // e.g. in the beginning there are no errors, but the form is still not valid and should not be submittable
            disabled={!empty(this.validate())}
          >
            {this.buttonLabel}
          </button>
        </form>
      </div>
    );
  }
}

export default Form;
