import div, { Component } from "react";
import Like from "./like";
import PropTypes from "prop-types";

class MoviesTable extends Component {
  raiseSort = path => {
    const { onSort, sortColumn } = this.props;
    const column = { ...sortColumn };

    if (column.path === path) {
      column.order = column.order === "asc" ? "desc" : "asc";
    } else {
      column.path = path;
    }

    onSort(column);
  };

  render() {
    const {
      totalSize,
      filteredSize,
      paginatedMovies,
      onLikeToggle,
      onDelete,
    } = this.props;

    if (filteredSize <= 0) {
      return <p>There are currently no movies</p>;
    }
    return (
      <div className="movies-table">
        <table className="table">
          <thead>
            <tr>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("title")}
                scope="col"
              >
                Title
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("genre.name")}
                scope="col"
              >
                Genre
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("numberInStock")}
                scope="col"
              >
                Stock
              </th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.raiseSort("dailyRentalRate")}
                scope="col"
              >
                Rate
              </th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedMovies.map((movie, i) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onToggle={onLikeToggle}
                    bindingContext={movie}
                    isEnabled={movie.isLiked}
                  />
                </td>
                <td>
                  <button
                    id={movie._id}
                    onClick={() => onDelete(movie._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
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
