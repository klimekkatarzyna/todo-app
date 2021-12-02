import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import history from './history';
import { History } from 'history';

render(
	<React.StrictMode>
		<Router history={history as History}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);
