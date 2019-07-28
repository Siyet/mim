import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './app/App';

const appElement: HTMLElement | null = document.getElementById('app');

ReactDOM.render(<App/>, appElement);
