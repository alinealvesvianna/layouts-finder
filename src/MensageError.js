import React, { Component } from 'react';
import './App.css';

const MensageError = (props) => <div className="error">
    <p className="error__txt">
        <span className="icon-thumbs-down error__icon"></span>
        Ops...Alguma coisa deu errado: {props.message}
    </p>
</div>

export default MensageError;