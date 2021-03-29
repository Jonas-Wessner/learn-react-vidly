import React, { Component } from "react";
import PropTypes from "prop-types";

class Counter extends Component {
  // directly returning the counter, not copying it into a property !
  // this is important in order to stay up to date with the parent that we receive the props from
  // the getter, however, is purely to avoid redundancy in the below code
  get counter() {
    return this.props.counter;
  }

  render() {
    // object destructuring,
    // this stores the attributes that we are interested in in separate variables.
    // this makes using those variables below shorter and cleaner
    const { onIncrement, onDecrement, onDelete, counter } = this.props;

    return (
      <div className="row">
        <span id="counterValue" className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <div className="col">
          <button
            onClick={() => onIncrement(counter)}
            className="btn btn-primary"
          >
            +
          </button>
          <button
            className="btn btn-secondary"
            disabled={this.counter.value === 0 ? "disabled" : ""}
            onClick={() => onDecrement(counter)}
          >
            -
          </button>
          <button
            onClick={() => onDelete(counter)}
            className="btn btn-danger m-2"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  getBadgeClasses() {
    let classes = "col badge m-2 badge-";
    return (classes += this.counter.value === 0 ? "warning" : "success");
  }

  formatCount() {
    const { value } = this.props.counter; // Object destructuring
    return value === 0 ? "zero" : value;
  }

  getDecrementButtonClasses = () => {
    let classes = "btn btn-";
    return (classes += this.counter.value === 0 ? "light" : "secondary");
  };
}

Counter.propTypes = {
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  counter: PropTypes.shape({
    value: PropTypes.number.isRequired,
  }).isRequired,
};

export default Counter;
