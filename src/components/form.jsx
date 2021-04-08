import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import { empty } from "../modules/utils";
import Validator from "./../modules/validator";

class Form extends Component {
  state = { data: {}, errors: {} };

  title = "Form";
  buttonLabel = "Submit";

  validate = () => {
    const options = { abort: "1eachProp" }; // do not stop after first error
    const errors = Validator.validate(this.state.data, this.schema, options);
    return errors;
  };

  // returns a new error object that results from this.state.errors with the given property updated
  validateProperty = ({ name, value }) => {
    const toValidate = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const options = { abort: "first" };
    const newErrors = Validator.validate(toValidate, schema, options); // only the errors of one property

    const errors = { ...this.state.errors };

    if (empty(newErrors)) {
      delete errors[name]; // clear error if not present
    } else {
      errors[name] = newErrors[name];
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
        errors={errors[name]}
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
