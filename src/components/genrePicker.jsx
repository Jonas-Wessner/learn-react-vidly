import React, { Component } from "react";
import PropTypes from "prop-types";
import { getGenres } from "../services/genreService";
class GenrePicker extends Component {
  state = {
    genres: [],
  };

  async componentDidMount() {
    const genres = await getGenres();
    genres.unshift({ _id: null, name: "AllGenres" });
    this.setState({ genres });
  }

  generateItems = () => {
    const { selectedGenreId, onStateChanged } = this.props;
    const { genres } = this.state;
    return genres.map((genre) => (
      <li
        className={
          "list-group-item" + (selectedGenreId === genre._id ? " active" : "")
        }
        key={genre._id}
        onClick={() => onStateChanged(genre)} // calls the passed function with the id of the clicked genre
      >
        {genre.name}
      </li>
    ));
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
