import React, { Component } from "react";
import PropTypes from "prop-types";
import GenericInput from "./genericInput";

class Select extends GenericInput {
  renderContent = () => {
    // ...rest is used to pass any further arguments down by exactly their name.
    const { name, options, onChange, type = "text", ...rest } = this.props;
    return (
      <select
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        className="form-control"
        {...rest}
      >
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };
}

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

export default Select;
