import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { decrement, increment } from "../redux/slices/counterSlice";

const mapStateToProps = (state) => {
  return {
    value: state.counterReducer.value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    incrementCount: (e) => {
      return dispatch(increment(e));
    },
    decrementCount: (e) => {
      return dispatch(decrement(e));
    },
  };
};

class Rental extends React.Component {
  // const [count_by_hook, setCount] = useState(0);

  // useEffect(() => {
  //Update the document title and componenDidmount
  // document.titile = `You clicked ${count_by_hook} times`;
  // });

  render() {
    return (
      <div>
        <button
          aria-label="Increment value"
          onClick={this.props.incrementCount}
        >
          Increment by redux
        </button>
        <span>{this.props.value}</span>
        <button
          aria-label="Decrement value"
          onClick={this.props.decrementCount}
        >
          Decrement by redux
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Rental);
