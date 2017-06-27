import React, { Component } from 'react';
import './App.css';

const LikeShot = (props) => <li key={props.id}>
  <a href = {props.userLink}>
    <img src={props.avatar} alt={"Usuario que curtiu: " + props.description}/>
    {props.nameUser}
  </a>
</li>

export default LikeShot;