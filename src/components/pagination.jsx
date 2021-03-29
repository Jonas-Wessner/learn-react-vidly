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
          // must let parent change the active state, because the parent is the
          //one that initiates rerendering this component with a different currentPageId
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
    // return empty div instead of null in order to be still acquire the same space like before,
    // when this will suddenly not be rendered at runtime due to a change of page sizes => to not break layout
    if (this.pages <= 1) return <div />;
    return (
      <nav>
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
