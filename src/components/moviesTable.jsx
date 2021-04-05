import { Component } from "react";
import Like from "./like";
import PropTypes from "prop-types";
import Table from "./common/table";

class MoviesTable extends Component {
  // path is the path to the property displayed, name is the name displayed in the table-header
  columns = [
    { path: "title", name: "Title" },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    // last to columns have no path or name, but they have a content property
    // which is a function that returns a jsx-expression when given a row as parameter
    {
      getContent: movie => (
        <Like
          onToggle={this.props.onLikeToggle}
          bindingContext={movie}
          isEnabled={movie.isLiked}
        />
      ),
    },
    {
      getContent: movie => (
        <button
          id={movie._id}
          onClick={() => this.props.onDelete(movie._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const {
      totalSize,
      filteredSize,
      paginatedMovies,
      sortColumn,
      onSort,
    } = this.props;

    return (
      <Table
        className="movies-table"
        columns={this.columns}
        sortColumn={sortColumn}
        data={paginatedMovies}
        onSort={onSort}
        itemName="movies"
        totalItemsSize={totalSize}
        displayedItemsSize={filteredSize}
      />
    );
  }
}

MoviesTable.propTypes = {
  totalSize: PropTypes.number.isRequired, // number of movies that are available in total
  filteredSize: PropTypes.number.isRequired, // number of movies that match the filter
  paginatedMovies: PropTypes.array.isRequired, // the movies to display on the current page
  sortColumn: PropTypes.object.isRequired, // {path: ???, order: ???} determining which column is the current sortColumn
  onLikeToggle: PropTypes.func.isRequired, // event that is raised when the like of a movie is toggled
  onDelete: PropTypes.func.isRequired, // event that is raised when a movie is deleted
  onSort: PropTypes.func.isRequired, // handler for event that is raised when a columns header is clicked to be sorted
};

export default MoviesTable;
