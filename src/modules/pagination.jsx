import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};

  get pages() {
    const { itemCount, pageSize } = this.props;
    return Math.ceil(itemCount / pageSize);
  }

  generateLinks = () => {
    const { currentPageIndex, onStateChanged } = this.props;
    const links = [];
    for (let i = 0; i < this.pages; ++i) {
      links.push(
        <li
          key={i}
          onClick={() => onStateChanged(i)}
          className={currentPageIndex === i ? "page-item active" : "page-item"}
        >
          <a className="page-link">{i + 1}</a>
        </li>
      );
    }
    return links;
  };

  render() {
    // this component is only needed with multiple pages
    if (this.pages <= 1) return null;
    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination">{this.generateLinks()}</ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPageIndex: PropTypes.number.isRequired,
  onStateChanged: PropTypes.func.isRequired,
};

export default Pagination;
