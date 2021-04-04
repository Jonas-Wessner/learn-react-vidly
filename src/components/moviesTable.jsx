import div, { Component } from "react";
import Like from "./like";
import PropTypes from "prop-types";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  columns = [
    { path: "title", name: "Title" },
    { path: "genre.name", name: "Genre" },
    { path: "numberInStock", name: "Stock" },
    { path: "dailyRentalRate", name: "Rate" },
    {}, // no heading for those columns
    {},
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
