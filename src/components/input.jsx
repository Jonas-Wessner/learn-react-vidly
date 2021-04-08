import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericInput from "./genericInput";

// ...rest is used to pass any further arguments down by exactly their name.
class Input extends GenericInput {
  renderContent = () => {
    const { name, type = "text", ...rest } = this.props;
    return (
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        {...rest}
      />
    );
  };

  render() {
    const {
      name,
      label,
      errors,
      onChange,
      type = "text",
      ...rest
    } = this.props;

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          onChange={onChange}
          className="form-control"
          {...rest}
        />
        {/* only display when error is truthy */}
        {errors && this.renderErrors()}
      </div>
    );
  }
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
