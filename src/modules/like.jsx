import React, { Component } from "react";
import "font-awesome/css/font-awesome.css";

class Like extends Component {
  state = {};

  render() {
    const { onToggle, isEnabled } = this.props;
    return (
      <i onClick={() => onToggle(this.props.bindingContext, !isEnabled)}>
        {isEnabled ? "Liked" : "Hated"}
      </i>
    );
  }
}

export default Like;
