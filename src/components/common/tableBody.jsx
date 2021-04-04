import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (row, column) => {
    // if this is truthy i.e. not undefined or sth. invalid
    if (column.getContent) {
      return column.getContent(row); // function that is provided to render a specific column when given a specific row
    }

    // if not getContent-function is supplied we want to just display what is in the path that our table header points to
    return _.get(row, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map((column, j) => (
              <td key={j}>{this.renderCell(row, column)}</td> // get nested property dynamically with lodash (e.g. row.genre.name))
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
