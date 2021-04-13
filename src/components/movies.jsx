import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import notice from "./notificationService";
import MoviesPage from "./moviesPage";
import { Route, Switch } from "react-router-dom";
import MovieForm from "./movieForm";

class Movies extends Component {
  state = {
    movies: [],
  };

  componentDidMount = async () => {
    this.setState({ movies: await getMovies() });
  };

  handleDelete = (id) => {
    const prevMovies = [...this.state.movies];

    // changes in memory for user experience
    const movies = this.state.movies.filter((mov) => mov._id !== id);
    this.setState({ movies });
    // save changes in DB
    deleteMovie(id).then((response) => {
      if (response === null) {
        this.setState({ movies: prevMovies }); // revert UI if update did not succeed
      }
    });
  };

  handleLikeToggle = (movie, isEnabled) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = isEnabled;
    this.setState({ movies });
  };

  handleSave = (movie) => {
    let movies = [...this.state.movies];
    const index = movies.findIndex(({ _id }) => movie._id === _id);
    if (index >= 0) {
      // not need to clone the movie, because we are only modifying the pointer (reference)
      // to a movie in a NEW array that is decoupled from the state
      movies[index] = movie; // if movie exists, update it
    } else {
      movies.push(movie); // if movie does not exist, create new one
    }
    this.setState({ movies });
  };

  render() {
    return (
      <Switch>
        <Route
          path="/movies/:id"
          render={(props) => (
            <MovieForm
              movies={this.state.movies}
              onSave={this.handleSave}
              {...props}
            />
          )}
        />
        <Route
          path="/movies"
          render={(props) => (
            <MoviesPage
              movies={this.state.movies}
              onDelete={this.handleDelete}
              onLikeToggle={this.handleLikeToggle}
              {...props} // pass props that the Route-component wants to pass to it's children
            />
          )}
        />
      </Switch>
    );
  }
}

export default Movies;
