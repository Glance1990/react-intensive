// Core
import React from 'react';
import ReactDOM from 'react-dom';


// Theme
import './theme/init';

// Components
import { App } from './pages/App';

const element1 = <h1 title="A title">Hello lectrum</h1>;

// const element2 = React.createElement(
//     'h1',
//     {title: "A title"},
//     "Hello"
// );

// const list = [...Array(10).keys()].map((num, index) => <li key = {index}>List item:{num}</li>);

ReactDOM.render(<App />, document.getElementById('app'));
