import React, { Component } from 'react';
import './App.css';

class ShowDetailShot extends Component {
    render(){
        return(
          <div>
            <h1>{this.props.title}</h1>
            <h2>{this.props.likesAmount} curtiram!</h2>
            <img src={this.props.url} alt={this.props.description} />
          </div>
      )
  }
}

export default ShowDetailShot;