import React, { Component } from "react";
import GenrePicker from "./genrePicker";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import _ from "lodash";
import memoize from "memoize-one";

class MoviesPage extends Component {
  state = {
    pageSize: 3,
    currentPageIndex: 0,
    currentGenreId: null,
    searchString: "",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  handlePageChanged = (index) => {
    this.setState({
      currentPageIndex: index,
    });
  };

  handleGenreChanged = (genre) => {
    const newState = {
      currentGenreId: genre._id,
      currentPageIndex: 0, // start looking at new genre from first page
      searchString: "", // also clear search if we filter for genre
    };
    this.setState(newState);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (searchString) => {
    const newState = {
      searchString: searchString,
      currentGenreId: null, // also clear genre if we search something
      currentPageIndex: 0,
    };
    this.setState(newState);
  };

  // defines how filtering is performed
  matchesFilter = (movie) => {
    const { currentGenreId, searchString } = this.state;
    return (
      (currentGenreId === null || movie.genre._id === currentGenreId) &&
      movie.title.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    );
  };

  // this allows us to not recalculate the currentPage index, if itemsCount and currentPageIndex have not changed,
  // another solution would be to lift the currentPageIndex up and only recalculate it if the movies change,
  // but it does conceptually not belong there
  getValidCurrentPageIndex = memoize((itemsCount, currentPageIndex) => {
    console.log("currentPageIndex called");
    const { pageSize } = this.state;

    const pages = Math.ceil(itemsCount / pageSize);
    if (pages === 0) {
      return 0;
    }
    return currentPageIndex < pages && currentPageIndex >= 0
      ? currentPageIndex
      : pages - 1;
  });

  getFilteredMovies = () => {
    return this.props.movies.filter((movie, i) => this.matchesFilter(movie));
  };

  getPaginatedMovies = (sortedMovies) => {
    const { pageSize } = this.state;
    // set currentPageIndex to a valid Index (it might have been invalidated through deletes or updates in the movie component)
    const currentPageIndex = this.getValidCurrentPageIndex(
      sortedMovies.length,
      this.state.currentPageIndex
    );
    return sortedMovies.filter(
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
    const { pageSize, currentGenreId, sortColumn, searchString } = this.state;

    const { onDelete, onLikeToggle, movies: allMovies } = this.props;

    const { filteredSize, movies, history } = this.getRenderedData();

    // set currentPageIndex to a valid Index (it might have been invalidated through deletes or updates in the movie component)
    const currentPageIndex = this.getValidCurrentPageIndex(
      filteredSize,
      this.state.currentPageIndex
    );

    return (
      <div className="movies-page">
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
          onLikeToggle={onLikeToggle}
          onDelete={onDelete}
          history={history}
          onSearch={this.handleSearch}
          searchString={searchString}
        />
      </div>
    );
  }
}

export default MoviesPage;
