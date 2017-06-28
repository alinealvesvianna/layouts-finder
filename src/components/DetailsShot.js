import React, { Component } from 'react';
import './../styles/DetailsShot.css';

export class ShowDetailShot extends Component {
    render(){
        return(
          <div className="modal__details">
            <span className="close" onClick={this.props.closeModal}>x fechar</span>
            <p className="modal__tit">{this.props.title}</p>
            <p className="modal__txt">{this.props.likesAmount} pessoas curtiram!</p>
            <img className="modal__img" src={this.props.url} alt={this.props.description} />
          </div>
      )
  }
}


export const LikeShot = (props) => <li className="likes-list__item" key={props.id}>
  <a href = {props.userLink}>
    <img className="likes-list__img" src={props.avatar} alt={"Usuario que curtiu: " + props.description}/>
    <span className="likes-list__txt">{props.nameUser}</span>
  </a>
</li>
