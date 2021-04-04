import React, { Component } from "react";
import PropTypes from "prop-types";

class TableHeader extends Component {
  raiseSort = path => {
    const { onSort, sortColumn } = this.props;

    if (path === undefined) {
      return; // the column is a non-sortable column
    }

    let column = { ...sortColumn };

    if (column.path === path) {
      column.order = column.order === "asc" ? "desc" : "asc";
    } else {
      column = { path: path, order: "asc" };
    }

    onSort(column);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    // if this is not the column to be sorted, do not display an icon
    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") {
      return "\uD83E\uDC15";
    } else {
      return "\uD83E\uDC17";
    }
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column, index) => {
            return (
              <th
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort(column.path)}
                scope="col"
              >
                {column.name}
                {this.renderSortIcon(column)}
              </th>
            );
          })}
        </tr>
      </thead>
    );
  }
}

TableHeader.propTypes = {
  // the columns for the table in the structure like:
  // [{path: ???, name: ???}, ...]
  columns: PropTypes.array.isRequired,
  sortColumn: PropTypes.object.isRequired, // {path: ???, order: ???} determining which column is the current sortColumn
  onSort: PropTypes.func.isRequired, // event that is raised when a colums header is clicked to be sorted
};

export default TableHeader;
