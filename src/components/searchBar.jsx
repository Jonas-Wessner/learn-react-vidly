import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    const { className, onChange, value, ...rest } = this.props;

    return (
      <div className={className + " input-group"} {...rest}>
        <div className="form-outline">
          <input
            onChange={e => onChange(e.target.value)} // only pass the new searchString value to the handler function for simplicity
            type="search"
            value={value}
            placeholder="search..."
            className="form-control"
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
