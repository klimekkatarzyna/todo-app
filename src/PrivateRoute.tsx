import { FC, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext, AuthContextType } from './AuthContext';

interface IPrivateRoute {
	path: string;
	exact?: boolean;
}

export const PrivateRoute: FC<IPrivateRoute> = ({ children, ...rest }) => {
	const { authData } = useContext<AuthContextType>(AuthContext);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				authData?._id ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};
