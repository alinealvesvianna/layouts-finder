import React, { Component } from 'react';
import './App.css';

const Loading = (props) => <div className="loading">
    <p className="loading__txt">
        <span className="loading__animation"></span>
        <span className="icon-thumbs-up loading__icon"></span>
        Carregando
    </p>
</div>


export default Loading;