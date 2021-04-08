import React from "react";
import Validator from "../modules/validator";
import { getGenres } from "../services/fakeGenreService";
import Form from "./form";

class MovieForm extends Form {
  constructor() {
    super();
    const obj = {
      data: {
        title: "",
        genreId: "",
        numberInStock: "",
        rate: "",
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
    rate: new Validator()
      .notEmpty()
      .number()
      .minValue(0)
      .maxValue(10)
      .setLabel("Rate"),
  };

  componentDidMount = () => {
    this.setState({ genres: getGenres() });
  };

  handleSubmit = () => {
    // Call Server and redirect user
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
          name: "rate",
          label: "Rate",
        })}
      </React.Fragment>
    );
  };
}

export default MovieForm;
