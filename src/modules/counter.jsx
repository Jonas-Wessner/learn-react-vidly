import React, { Component } from "react";

class Counter extends Component {
  render() {
    return (
      <div className="counter">
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
        <button
          onClick={() => this.props.onIncrement(this.props.counter)}
          className="btn btn-primary"
        >
          ++
        </button>
        <button
          onClick={() => this.props.onDelete(this.props.counter)}
          className="btn btn-danger m-2"
        >
          Delete
        </button>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    return (classes += this.props.counter.value === 0 ? "danger" : "success");
  }

  formatCount() {
    const count = this.props.counter.value; // Object destructuring
    return count === 0 ? "zero" : count;
  }
}

export default Counter;
