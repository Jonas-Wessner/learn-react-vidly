import React, { Component } from "react";
import "./App.css";
import Counters from "./modules/counters";
import Like from "./modules/like";
import NavBar from "./modules/navBar";

class App extends Component {
  state = {
    isLiked: false,
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

  updateCounterValue = (counter, value) => {
    const c = [...this.state.counters]; // clone counters
    const index = c.indexOf(counter);
    c[index] = { ...counter }; // clone relevant counter, because is is so far still referencing the counter in the state
    c[index].value = value; // increment new value without modifying this.state
    this.setState({ counters: c }); // let react properly update this.state
  };

  handleIncrement = counter => {
    this.updateCounterValue(counter, counter.value + 1);
  };

  handleDecrement = counter => {
    this.updateCounterValue(counter, counter.value - 1);
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

  handleLikeToggle = (bindingContext, isEnabled) => {
    const newState = { ...this.state };
    newState.isLiked = isEnabled;
    this.setState(newState);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar counters={this.state.counters} />
        <main className="container">
          <Like
            isEnabled={this.state.isLiked}
            onToggle={this.handleLikeToggle}
          />
          <Counters
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
            onDelete={this.handleDelete}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
