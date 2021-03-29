import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";
import PropTypes from "prop-types";

class Like extends Component {
  state = {};

  render() {
    const { onToggle, isEnabled, bindingContext } = this.props;
    return (
      <i onClick={() => onToggle(bindingContext, !isEnabled)}>
        {isEnabled ? "Liked" : "Hated"}
      </i>
    );
  }
}

Like.propTypes = {
  onToggle: PropTypes.func.isRequired,
  isEnabled: PropTypes.bool,
  bindingContext: PropTypes.any,
};

export default Like;
