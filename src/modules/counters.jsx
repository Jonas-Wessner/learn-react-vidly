import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
  state = {
    counters: [
      { value: 1, id: 0 },
      { value: 2, id: 1 },
      { value: 12, id: 2 },
    ],
  };

  handleDelete = counter => {
    this.setState({
      counters: this.state.counters.filter(elem => elem.id !== counter.id),
    });
  };

  handleIncrement = counter => {
    const c = [...this.state.counters]; // clone counters
    const index = c.indexOf(counter);
    c[index] = { ...counter }; // clone relevant counter, because is is so far still referencing the counter in the state
    c[index].value += 1; // increment new value without modifying this.state
    console.log(c);
    this.setState({ counters: c }); // let react properly update this.state
  };

  handleReset = () => {
    this.setState({
      counters: this.state.counters.map(counter => {
        const c = { ...counter };
        c.value = 0;
        return c;
      }),
    });
  };

  render() {
    if (this.state.counters.length === 0) return <div />; // render nothing, e.g. do not render Reset-button
    return (
      <React.Fragment>
        <button className="btn btn-primary m-2" onClick={this.handleReset}>
          Reset
        </button>
        {this.state.counters.map((counter, index) => (
          <Counter
            key={index}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            counter={counter}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
