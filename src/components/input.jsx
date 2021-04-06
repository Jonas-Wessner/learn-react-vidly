import React from "react";
import PropTypes from "prop-types";

const Input = ({ name, label, value, error, onChange, autoFocus }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        type="text"
        className="form-control"
        autoFocus={autoFocus}
      />
      {/* only display when error is truthy */}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
};

export default Input;
