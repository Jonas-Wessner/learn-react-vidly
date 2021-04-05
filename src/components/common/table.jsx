import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";

const Table = ({
  data,
  columns,
  sortColumn,
  onSort,
  itemName,
  totalItemsSize,
  displayedItemsSize,
  className,
}) => {
  if (data.length <= 0) {
    return <p>There are currently no {itemName}</p>;
  }

  return (
    <div className={className}>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={data} columns={columns} />
      </table>
      <p>
        Showing {displayedItemsSize}/{totalItemsSize} {itemName} in the database
      </p>
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func,
  itemName: PropTypes.string,
  totalItemsSize: PropTypes.number,
  displayedItemsSize: PropTypes.number,
  className: PropTypes.string, // classes the user of this component wants to set on it
};

Table.defaultProps = {
  itemName: "items",
};

export default Table;
