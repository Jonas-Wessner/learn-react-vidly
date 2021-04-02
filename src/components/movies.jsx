import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import GenrePicker from "./genrePicker";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";

class Movies extends Component {
  state = {
    pageSize: 3,
    currentPageIndex: 0,
    currentGenreId: null,
    movies: undefined,
  };

  /** The currentPageIndex in the state might be invalidated when deleting a movie,
   * because a page might be empty and therefore no more be valid.
   * We don't want to reset the currentPage index in the handleDelete-method,
   * because that requires knowledge about the filteredMovies, because the number of filteredMovies
   * determines the number of pages displayed and therefore the range of valid pageIndexes
   * Therefore we validate the currentPageIndex in the renderMethod and then use that value instead */
  validCurrentPageIndex = undefined;

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(mov => mov._id !== id);
    this.setState({
      movies: movies,
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
    this.setState({
      currentPageIndex: index,
    });
  };

  handleGenreChanged = genre => {
    this.setState({
      currentGenreId: genre._id,
      currentPageIndex: 0, // start looking at new genre from first page
    });
  };

  getValidCurrentPageIndex = itemsCount => {
    const { pageSize, currentPageIndex } = this.state;
    const pages = Math.ceil(itemsCount / pageSize);
    if (pages === 0) {
      return 0;
    }
    return currentPageIndex < pages && currentPageIndex >= 0
      ? currentPageIndex
      : pages - 1;
  };

  getFilteredMovies = () => {
    const { currentGenreId } = this.state;
    return this.state.movies.filter(
      (movie, i) =>
        currentGenreId === null || movie.genre._id === currentGenreId
    );
  };

  getPaginatedMovies = movies => {
    // when deleting items the currentPageIndex might have become invalid, because the page might be empty now
    const { pageSize } = this.state;
    return movies.filter(
      (m, index) => Math.floor(index / pageSize) === this.validCurrentPageIndex
    );
  };

  render() {
    const { pageSize, movies, currentGenreId } = this.state;

    const filteredMovies = this.getFilteredMovies();
    this.validCurrentPageIndex = this.getValidCurrentPageIndex(
      filteredMovies.length
    );
    const paginatedMovies = this.getPaginatedMovies(filteredMovies);

    return (
      <div className="movies">
        <GenrePicker
          selectedGenreId={currentGenreId}
          onStateChanged={this.handleGenreChanged}
        />
        <MoviesTable
          totalSize={movies.length}
          filteredSize={filteredMovies.length}
          paginatedMovies={paginatedMovies}
          onLikeToggle={this.handleLikeToggle}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemCount={filteredMovies.length}
          pageSize={pageSize}
          currentPageIndex={this.validCurrentPageIndex}
          onStateChanged={this.handlePageChanged}
        />
      </div>
    );
  }
}

export default Movies;
