import React, { Component } from "react";
import PropTypes from "prop-types";

// ...rest is used to pass any further arguments down by exactly their name.
class GenericInput extends Component {
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

  renderContent = () => {
    throw new Error(
      "When extending the 'GenericInput' class make sure to provide a renderContent-method that specifies which specific type of input field will be rendered"
    );
  };

  render() {
    const { name, label, errors } = this.props;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        {this.renderContent()}
        {/* only display when error is truthy */}
        {errors && this.renderErrors()}
      </div>
    );
  }
}

GenericInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
};

export default GenericInput;
