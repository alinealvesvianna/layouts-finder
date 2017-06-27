import React, { Component } from 'react';
import './../styles/FormComponents.css';

export class SelectFilter extends Component {
  render(){
    return (
        <select
          className = "select-form"
          onChange={this.props.handleChange}
          value={this.props.value}
          name={this.props.name}>
              {this.props.children}
          </select>
        );
    }
}


export class SwitchSize extends Component {
  render(){
    return(
      <input type="checkbox"
        onChange={this.props.handleImage}
        checked={this.props.isLarge}
        name={this.props.sizeCheckbox} />
    )
  }
}

