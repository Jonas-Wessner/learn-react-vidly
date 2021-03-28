import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";
import Pagination from "./pagination";

class MovieTable extends Component {
  state = {
    pageSize: 3,
    currentPageIndex: 0,
  };

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  handleDelete = index => {
    const movies = this.state.movies.filter((elem, i) => i !== index);
    const { pageSize, currentPageIndex } = this.state;
    this.setState({
      movies: movies,
      currentPageIndex: this.getValidCurrentPageIndex(
        movies.length,
        pageSize,
        currentPageIndex
      ),
    });
  };

  handleLikeToggle = (movie, isEnabled) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = isEnabled;
    this.setState({ movies });
  };

  handlePaginationStateChanged = index => {
    this.setState({ currentPageIndex: index });
  };

  getValidCurrentPageIndex = (itemsCount, pageSize, currentPageIndex) => {
    const pages = Math.ceil(itemsCount / pageSize);
    return currentPageIndex < pages ? currentPageIndex : pages - 1;
  };

  render() {
    const { pageSize, currentPageIndex, movies } = this.state;
    if (movies.length === 0) return <p>There are currently no more movies</p>;

    const renderedMovies = this.state.movies.filter(
      (v, index) => Math.floor(index / pageSize) === currentPageIndex
    );

    return (
      // need react fragment, because jsx-expressions need a parent element
      <React.Fragment>
        <p>Showing {movies.length} movies in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {renderedMovies.map((movie, index) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    onToggle={this.handleLikeToggle}
                    bindingContext={movie}
                    isEnabled={movie.isLiked}
                  />
                </td>
                <td>
                  <button
                    id={index}
                    onClick={() => this.handleDelete(index)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemCount={movies.length}
          pageSize={pageSize}
          currentPageIndex={currentPageIndex}
          onStateChanged={this.handlePaginationStateChanged}
        />
      </React.Fragment>
    );
  }
}

export default MovieTable;
