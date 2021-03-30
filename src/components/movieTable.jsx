import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import GenrePicker from "./genrePicker";
import Like from "./like";
import Pagination from "./pagination";

// TODO: When Deleting a Movie, the currentPageIndex is updated to be valid.
// However, so far we check whether it is valid for the entire movies in the list.
// instead we want to check if it is valid for the list of movies currently displayed.
// Therefore we must move the filtered movies to this.state and validate the currentPageIndex every time this list changes.
// Filtered List means after filtering for Genre
class MovieTable extends Component {
  state = {
    pageSize: 3,
    currentPageIndex: 0,
    currentGenreId: null,
    movies: undefined,
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

  handlePageChanged = index => {
    this.setState({ currentPageIndex: index });
  };

  handleGenreChanged = genre => {
    console.log(genre);
    this.setState({
      currentGenreId: genre._id,
    });
  };

  getValidCurrentPageIndex = (itemsCount, pageSize, currentPageIndex) => {
    const pages = Math.ceil(itemsCount / pageSize);
    return currentPageIndex < pages ? currentPageIndex : pages - 1;
  };

  getFilteredMovies = movies => {
    const { currentGenreId } = this.state;
    return movies.filter(
      (movie, i) =>
        currentGenreId === null || movie.genre._id === currentGenreId
    );
  };

  getRenderedMovies = movies => {
    const { pageSize, currentPageIndex } = this.state;
    return movies.filter(
      (m, index) => Math.floor(index / pageSize) === currentPageIndex
    );
  };

  render() {
    const { pageSize, currentPageIndex, movies } = this.state;
    const filteredMovies = this.getFilteredMovies(movies);
    const size = filteredMovies.length;
    const renderedMovies = this.getRenderedMovies(filteredMovies);

    if (size === 0) return <p>There are currently no more movies</p>;

    return (
      <div className="movie-table">
        <GenrePicker
          selectedGenreId={this.state.currentGenreId}
          onStateChanged={this.handleGenreChanged}
        />
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
          itemCount={size}
          pageSize={pageSize}
          currentPageIndex={currentPageIndex}
          onStateChanged={this.handlePageChanged}
        />
        <p>Showing {size} movies in the database</p>
      </div>
    );
  }
}

export default MovieTable;
