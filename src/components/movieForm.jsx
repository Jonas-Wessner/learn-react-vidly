import React from "react";
import Validator from "../modules/validator";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./form";
import { empty } from "../modules/utils";

class MovieForm extends Form {
  constructor() {
    super();
    const obj = {
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: "",
      },
      genres: [],
    };
    // add this, do not override properties of Form
    Object.assign(this.state, obj);
  }

  title = "Movie Form";
  buttonLabel = "Save";

  schema = {
    title: new Validator().notEmpty().setLabel("Title"),
    genreId: new Validator().notEmpty().integer().setLabel("Genre"),
    numberInStock: new Validator()
      .notEmpty()
      .integer()
      .minValue(0)
      .maxValue(100)
      .setLabel("Number In Stock"),
    dailyRentalRate: new Validator()
      .notEmpty()
      .number()
      .minValue(0)
      .maxValue(10)
      .setLabel("Rate"),
  };

  componentDidMount = () => {
    this.setState({ genres: getGenres() });

    const id = this.props.match.params.id;
    if (id === "new") return; // no fields to fill with initial data

    const movie = getMovie(this.props.match.params.id);

    if (empty(movie)) {
      this.props.history.replace("/not-found");
      return; // stop execution of method after redirection
    }

    this.setState({ data: this.mapToViewModel(movie) });
  };

  mapToViewModel = dbMovie => {
    return {
      title: dbMovie.title,
      genreId: dbMovie.genre._id,
      numberInStock: dbMovie.numberInStock,
      dailyRentalRate: dbMovie.dailyRentalRate,
    };
  };

  handleSubmit = () => {
    saveMovie(this.state.data);
    console.log("Submitted");
    this.props.history.goBack();
  };

  renderContent = () => {
    return (
      <React.Fragment>
        {this.renderInput({
          name: "title",
          label: "Title",
          autoFocus: true,
        })}
        {this.renderSelect({
          name: "genreId",
          label: "Genre",
          options: this.state.genres,
        })}
        {this.renderInput({
          name: "numberInStock",
          label: "Number In Stock",
        })}
        {this.renderInput({
          name: "dailyRentalRate",
          label: "Rate",
        })}
      </React.Fragment>
    );
  };
}

export default MovieForm;
