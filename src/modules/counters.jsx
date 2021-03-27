import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  render() {
    const { onIncrement, onDelete, onReset, counters } = this.props;

    if (counters.length === 0) return <div />; // render nothing, e.g. do not render Reset-button
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
            counter={counter}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
