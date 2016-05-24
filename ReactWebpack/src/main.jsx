import Hello from './scripts/Hello.jsx';
import React from 'react';
import jquery from 'jquery';
import ReactDOM from 'react-dom';
jquery(() => {
    ReactDOM.render(<Hello />, document.getElementById('application'));
});
