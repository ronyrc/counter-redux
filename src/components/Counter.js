import React, { Component } from 'react'
import { connect } from "react-redux";
import { increment, zero, decrement, incrementAmount } from '../redux/index'

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 0};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div>
        <h1>{this.props.counter}</h1>
        <button onClick={ () => this.props.decrement()}>Decrement</button><br />
        <button onClick={ () => this.props.increment()}>Increment</button><br />
        <button onClick={ () => this.props.zero()}>Zero</button><br />
        <button onClick={ () => this.props.incrementAmount(this.state.value)}>Amount this:</button>
        <input value={this.state.value} onChange={this.handleChange} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = {
  increment, zero, decrement, incrementAmount
};

// Conecta os dois objetos com o componente "Counter" do React
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);