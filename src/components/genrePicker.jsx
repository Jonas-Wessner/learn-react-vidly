import React, { Component } from "react";
import PropTypes from "prop-types";
import { getGenres } from "../services/fakeGenreService";
class GenrePicker extends Component {
  state = {};

  generateItems = () => {
    const { selectedGenreId, onStateChanged } = this.props;
    const genres = getGenres();
    genres.unshift({ _id: null, name: "AllGenres" });
    return genres.map(genre => {
      return (
        <li
          className={
            "list-group-item" + (selectedGenreId === genre._id ? " active" : "")
          }
          key={genre._id}
          onClick={() => onStateChanged(genre)} // calls the passed function with the id of the clicked genre
        >
          {genre.name}
        </li>
      );
    });
  };

  render() {
    return <ul className="genre-picker list-group">{this.generateItems()}</ul>;
  }
}

GenrePicker.propTypes = {
  selectedGenreId: PropTypes.string,
  onStateChanged: PropTypes.func.isRequired,
};

GenrePicker.defaultProps = {
  selectedGenreId: null,
};

export default GenrePicker;
