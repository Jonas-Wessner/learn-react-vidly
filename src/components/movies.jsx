import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import GenrePicker from "./genrePicker";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import _ from "lodash";

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

  getRenderedData = () => {
    const { sortColumn } = this.state;

    const filteredMovies = this.getFilteredMovies();

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path], // filtered path, nested paths separated by "." are allowed with lodash
      [sortColumn.order]
    );

    const paginatedMovies = this.getPaginatedMovies(sortedMovies);

    return {
      filteredSize: filteredMovies.length,
      movies: paginatedMovies,
    };
  };

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentGenreId,
      currentPageIndex,
      sortColumn,
    } = this.state;

    const { filteredSize, movies } = this.getRenderedData();

    return (
      <div className="movies">
        <div>
          <GenrePicker
            selectedGenreId={currentGenreId}
            onStateChanged={this.handleGenreChanged}
          />
          <Pagination
            className="mt-3 mx-1"
            itemCount={filteredSize}
            pageSize={pageSize}
            currentPageIndex={currentPageIndex}
            onStateChanged={this.handlePageChanged}
          />
        </div>
        <MoviesTable
          totalSize={allMovies.length}
          filteredSize={filteredSize}
          paginatedMovies={movies}
          sortColumn={sortColumn}
          onSort={this.handleSort}
          onLikeToggle={this.handleLikeToggle}
          onDelete={this.handleDelete}
          history={this.props.history}
        />
      </div>
    );
  }
}

export default Movies;
