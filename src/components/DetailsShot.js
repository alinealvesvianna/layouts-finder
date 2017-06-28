import React, { Component } from 'react';
import './../styles/DetailsShot.css';

export class ShowDetailShot extends Component {
    render(){
        return(
          <div className="detailShot">
            <span className="close" onClick={this.props.closeModal}>x</span>
            <h1>{this.props.title}</h1>
            <h2>{this.props.likesAmount} curtiram!</h2>
            <img src={this.props.url} alt={this.props.description} />
          </div>
      )
  }
}


export const LikeShot = (props) => <li key={props.id}>
  <a href = {props.userLink}>
    <img src={props.avatar} alt={"Usuario que curtiu: " + props.description}/>
    {props.nameUser}
  </a>
</li>
