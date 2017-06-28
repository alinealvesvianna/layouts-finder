import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/reset.css';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Oswald:400,700', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
