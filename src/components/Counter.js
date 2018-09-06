import React, { Component } from 'react'
import { connect } from "react-redux";
class Counter extends Component {
  render() {
    return (
      <div>
        <h1>1</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
  
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);