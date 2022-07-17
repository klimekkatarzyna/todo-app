import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// because of bug in react-scripts
(window as any).process = {};

render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
