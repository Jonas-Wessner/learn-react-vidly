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
    filteredMovies: undefined,
    paginatedMovies: undefined,
  };

  constructor() {
    super();
    this.state.movies = getMovies();
    this.state.filteredMovies = this.state.movies; // no filters to start with
    this.state.paginatedMovies = this.paginate(
      this.state.filteredMovies,
      this.state.pageSize,
      this.state.currentPageIndex
    );
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(mov => mov._id !== id);
    const { pageSize, currentPageIndex, currentGenreId } = this.state;
    const filteredMovies = this.filter(movies, currentGenreId);
    const validPageIndex = this.getValidCurrentPageIndex(
      filteredMovies.length,
      pageSize,
      currentPageIndex
    );
    const paginatedMovies = this.paginate(
      filteredMovies,
      pageSize,
      validPageIndex
    );
    this.setState({
      movies: movies,
      filteredMovies: filteredMovies,
      paginatedMovies: paginatedMovies,
      currentPageIndex: validPageIndex,
    });
  };

  handleLikeToggle = (movie, isEnabled) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = isEnabled;
    const { currentGenreId, pageSize, currentPageIndex } = this.state;
    const filteredMovies = this.filter(movies, currentGenreId);
    const paginatedMovies = this.paginate(
      filteredMovies,
      pageSize,
      currentPageIndex
    );
    this.setState({ movies, filteredMovies, paginatedMovies });
  };

  handlePageChanged = index => {
    const { movies, pageSize } = this.state;
    this.setState({
      currentPageIndex: index,
      paginatedMovies: this.paginate(movies, pageSize, index),
    });
  };

  handleGenreChanged = genre => {
    const { movies, pageSize, currentPageIndex } = this.state;
    const filteredMovies = this.filter(movies, genre._id);
    const validPageIndex = this.getValidCurrentPageIndex(
      filteredMovies.length,
      pageSize,
      currentPageIndex
    );
    const paginatedMovies = this.paginate(
      filteredMovies,
      pageSize,
      validPageIndex
    );
    console.log(genre);
    this.setState({
      currentGenreId: genre._id,
      filteredMovies: filteredMovies,
      paginatedMovies: paginatedMovies,
      currentPageIndex: validPageIndex,
    });
  };

  getValidCurrentPageIndex = (itemsCount, pageSize, currentPageIndex) => {
    const pages = Math.ceil(itemsCount / pageSize);
    if (pages === 0) {
      return 0;
    }
    return currentPageIndex < pages && currentPageIndex >= 0
      ? currentPageIndex
      : pages - 1;
  };

  filter = (movies, currentGenreId) => {
    return movies.filter(
      (movie, i) =>
        currentGenreId === null || movie.genre._id === currentGenreId
    );
  };

  paginate = (movies, pageSize, currentPageIndex) => {
    return movies.filter(
      (m, index) => Math.floor(index / pageSize) === currentPageIndex
    );
  };

  render() {
    const {
      pageSize,
      currentPageIndex,
      currentGenreId,
      movies,
      filteredMovies,
      paginatedMovies,
    } = this.state;
    const size = filteredMovies.length;

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
          itemCount={size}
          pageSize={pageSize}
          currentPageIndex={currentPageIndex}
          onStateChanged={this.handlePageChanged}
        />
      </div>
    );
  }
}

export default Movies;
