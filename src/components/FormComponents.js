import React, { Component } from 'react';

export class SelectFilter extends Component {
  render(){
    return (
        <select
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

