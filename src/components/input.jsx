import React, { Component } from "react";
import PropTypes from "prop-types";

// ...rest is used to pass any further arguments down by exactly their name.
class Input extends Component {
  renderErrors = () => {
    return (
      <div className="alert alert-danger">
        {this.props.errors.map((message, index) => (
          <div key={message + index} style={{ display: "block" }}>
            {message}
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { name, label, errors, type = "text", ...rest } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
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
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

export default Input;
