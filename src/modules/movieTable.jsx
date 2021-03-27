import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "./like";

class MovieTable extends Component {
  state = {};

  constructor() {
    super();
    this.state.movies = getMovies();
  }

  handleDelete = index => {
    this.setState({
      movies: this.state.movies.filter((elem, i) => i !== index),
    });
  };

  handleLikeToggle = (movie, isEnabled) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = isEnabled;
    this.setState({ movies });
    console.log(movies);
  };

  render() {
    const size = this.state.movies.length;
    if (size === 0) return <p>There are currently no more movies</p>;
    return (
      // need react fragment, because jsx-expressions need a parent element
      <React.Fragment>
        <p>Showing {size} movies in the database</p>
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
            {this.state.movies.map((movie, index) => (
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
      </React.Fragment>
    );
  }
}

export default MovieTable;
