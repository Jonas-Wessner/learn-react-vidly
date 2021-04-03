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
    sortColumn: { path: "title", order: "asc" },
  };

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  handleDelete = id => {
    const movies = this.state.movies.filter(mov => mov._id !== id);
    this.setState({
      movies: movies,
      currentPageIndex: this.getValidCurrentPageIndex(movies),
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

  handleSort = sortColumn => {
    this.setState({ sortColumn });
    console.log(sortColumn);
  };

  // defines how filtering is performed
  matchesFilter = movie => {
    const { currentGenreId } = this.state;
    return currentGenreId === null || movie.genre._id === currentGenreId;
  };

  getValidCurrentPageIndex = movies => {
    const itemsCount = movies.reduce(
      (acc, movie) => acc + this.matchesFilter(movie),
      0
    );

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
    return this.state.movies.filter((movie, i) => this.matchesFilter(movie));
  };

  getPaginatedMovies = movies => {
    const { pageSize, currentPageIndex } = this.state;
    return movies.filter(
      (m, index) => Math.floor(index / pageSize) === currentPageIndex
    );
  };

  render() {
    const {
      pageSize,
      movies,
      currentGenreId,
      currentPageIndex,
      sortColumn,
    } = this.state;

    const filteredMovies = this.getFilteredMovies();

    const sortedMovies = filteredMovies.sort((a, b) => {
      let ret = a[sortColumn.path] > b[sortColumn.path];
      return sortColumn.order === "asc" ? ret : !ret;
    });
    console.log(sortedMovies);

    const paginatedMovies = this.getPaginatedMovies(sortedMovies);

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
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onLikeToggle={this.handleLikeToggle}
          onDelete={this.handleDelete}
        />
        <Pagination
          itemCount={filteredMovies.length}
          pageSize={pageSize}
          currentPageIndex={currentPageIndex}
          onStateChanged={this.handlePageChanged}
        />
      </div>
    );
  }
}

export default Movies;
