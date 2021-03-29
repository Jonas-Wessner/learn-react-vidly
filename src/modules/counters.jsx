import React, { Component } from "react";
import Counter from "./counter";
import PropTypes from "prop-types";

class Counters extends Component {
  render() {
    const {
      onIncrement,
      onDecrement,
      onDelete,
      onReset,
      counters,
    } = this.props;

    if (counters.length === 0) return null; // render nothing, e.g. do not render Reset-button
    return (
      <React.Fragment>
        <button className="btn btn-primary m-2" onClick={onReset}>
          Reset
        </button>
        {counters.map((counter, index) => (
          <Counter
            key={index}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            counter={counter}
          />
        ))}
      </React.Fragment>
    );
  }
}

Counter.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  counters: PropTypes.array.isRequired,
};

export default Counters;
