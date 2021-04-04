import div, { Component } from "react";
import Like from "./like";
import PropTypes from "prop-types";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";

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
      onLikeToggle,
      onDelete,
      sortColumn,
      onSort,
    } = this.props;

    if (filteredSize <= 0) {
      return <p>There are currently no movies</p>;
    }
    return (
      <div className="movies-table">
        <table className="table">
          <TableHeader
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          <TableBody data={paginatedMovies} columns={this.columns} />
        </table>
        <p>
          Showing {filteredSize}/{totalSize} movies in the database
        </p>
      </div>
    );
  }
}

MoviesTable.propTypes = {
  totalSize: PropTypes.number.isRequired, // number of movies that are available in total
  filteredSize: PropTypes.number.isRequired, // number of movies that match the filter
  paginatedMovies: PropTypes.array.isRequired, // the movies to display on the current page
  onLikeToggle: PropTypes.func.isRequired, // event that is raised when the like of a movie is toggled
  onDelete: PropTypes.func.isRequired, // event that is raised when a movie is deleted
};

export default MoviesTable;
