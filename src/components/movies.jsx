import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { toast } from "react-toastify";
import MoviesPage from "./moviesPage";

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
        toast.error("Movie could not be deleted");
        this.setState({ movies: prevMovies }); // revert UI if update did not succeed
      } else {
        toast.success("Movie successfully deleted");
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

  render() {
    return (
      <MoviesPage
        movies={this.state.movies}
        onDelete={this.handleDelete}
        onLikeToggle={this.handleLikeToggle}
        history={this.props.history}
      />
    );
  }
}

export default Movies;
