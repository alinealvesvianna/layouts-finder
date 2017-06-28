import React, { Component } from 'react';
import './../styles/UIReturns.css';

export const MensageError = (props) => <div className="error">
    <p className="error__txt">
        <span className="icon-thumbs-down error__icon"></span>
        Ops...Alguma coisa deu errado: {props.message}
    </p>
</div>


export const Loading = (props) => <div className="loading">
    <p className="loading__txt">
        <span className="loading__animation"></span>
        Carregando
    </p>
</div>
