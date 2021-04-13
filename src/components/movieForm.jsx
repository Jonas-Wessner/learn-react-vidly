import React from "react";
import Validator from "../modules/validator";
import { getGenres } from "../services/genreService";
import { saveMovie } from "../services/movieService";
import Form from "./form";
import { empty } from "../modules/utils";

class MovieForm extends Form {
  constructor() {
    super();
    const obj = {
      data: {
        _id: "",
        title: "",
        genreId: null,
        numberInStock: null,
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
    title: new Validator().notEmpty().minLength(5).setLabel("Title"),
    genreId: new Validator().notEmpty().setLabel("Genre"),
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

  populateGenres = async () => {
    const genres = await getGenres();
    this.setState({ genres });
  };

  populateMovie = () => {
    const id = this.props.match.params.id;
    if (id === "new") return; // no fields to fill with initial data

    const movie = this.props.movies.find((movie) => movie._id === id);

    if (empty(movie)) {
      this.props.history.replace("/not-found");
      return; // stop execution of method after redirection
    }

    this.setState({ data: this.mapToViewModel(movie) });
  };

  componentDidMount = async () => {
    this.populateMovie();
    await this.populateGenres();
  };

  mapToViewModel = (dbMovie) => {
    return {
      _id: dbMovie._id,
      title: dbMovie.title,
      genreId: dbMovie.genre._id,
      numberInStock: dbMovie.numberInStock,
      dailyRentalRate: dbMovie.dailyRentalRate,
    };
  };

  handleSubmit = () => {
    // convert fields to type number, because backend expects that
    const movie = { ...this.state.data };
    movie.numberInStock = movie.numberInStock * 1;
    movie.dailyRentalRate = movie.dailyRentalRate * 1;

    saveMovie(movie).then((response) => {
      if (response === null) {
      } else {
        this.props.onSave(response.data); // raise onSave-event when movie is saved in DB
      }
    });

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
          valueType: "number",
        })}
        {this.renderInput({
          name: "dailyRentalRate",
          label: "Rate",
          valueType: "number",
        })}
      </React.Fragment>
    );
  };
}

export default MovieForm;
