import React from "react";
import PropTypes from "prop-types";
import GenericInput from "./genericInput";

// ...rest is used to pass any further arguments down by exactly their name.
class Input extends GenericInput {
  renderContent = () => {
    const { name, value, type = "text", ...rest } = this.props;
    return (
      <input
        id={name}
        name={name}
        type={type}
        className="form-control"
        value={value}
        {...rest}
      />
    );
  };
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Input;
